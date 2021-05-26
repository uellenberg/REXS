import {CustomTokenizer, RegexTokenizer, Token, TokenizerChain} from "parselib";
import {AssertionMap, CharactersMap} from "../builderHelpers";

export const Decompile = (input: string | RegExp) : string => {
    if(input instanceof RegExp) input = input.toString();

    let split = input.split("/");
    split.shift();

    let flags = split.pop().split("").map(flag => "flag(" + flag + ");").join("\n");
    if(flags.length > 0) flags += "\n\n";

    const tokens = groupTokenizerChain.run(split.join("/"));

    return flags + REXSDataToString(Recurse(tokens));
}

const REXSDataToString = (data: REXSData[], indent: number = 0) : string => {
    const indentStr = " ".repeat(indent * 4);

    let lines: string[] = [];

    for (let tag of data) {
        if(tag.tag === "ugroup"){
            lines.push(REXSDataToString(tag.body, indent));
            continue;
        }

        lines.push(indentStr + tag.tag + "(" + (tag.params || "") + ")" + (tag.body ? " {" : ";"));

        if(tag.body){
            lines.push(REXSDataToString(tag.body, indent+1));

            lines.push(indentStr + "}");
        }
    }

    return lines.join("\n");
}

//I don't even want to think about this code ever again.
const Recurse = (tokens: Token[], data?: RecurseData) : REXSData[] => {
    const stringSeq = tokens.map(token => token.value).join("");

    let outerTag: REXSData = null;

    let isSet = false;

    if(data && data.startToken.value === "(") {
        if(stringSeq.startsWith("?:")){
            outerTag = {tag: "ugroup"};
            tokens = tokens.slice(2);
        } else if(stringSeq.startsWith("?=")) {
            outerTag = {tag: "ahead"};
            tokens = tokens.slice(2);
        } else if(stringSeq.startsWith("?!")) {
            outerTag = {tag: "ahead", params: "not"};
            tokens = tokens.slice(2);
        } else if(stringSeq.startsWith("?<=")) {
            outerTag = {tag: "before"};
            tokens = tokens.slice(3);
        } else if(stringSeq.startsWith("?<!")) {
            outerTag = {tag: "before", params: "not"};
            tokens = tokens.slice(3);
        } else {
            outerTag = {tag: "group"};
        }
    } else if(data && data.startToken.value === "[") {
        isSet = true;
        outerTag = {tag: "set"};
    }

    let depth = 0;
    let startPos = -1;
    let out: REXSData[] = [];

    let curRepeat: REXSData = null;
    let awaitingEnd = false;

    let onOR = false;
    let orOut: REXSData = null;

    let recurseOnSet = false;

    //We need to go through each token, and find the highest nested sequences.
    for(let i = 0; i < tokens.length; i++){
        if(tokens[i].isToken && ["(", "["].includes(tokens[i].value) && !recurseOnSet && !isSet){
            if(curRepeat){
                curRepeat.params = getRepeatParams(curRepeat.params);
                out.push(curRepeat);

                curRepeat = null;
                awaitingEnd = false;
            }

            if (depth === 0) startPos = i;
            depth++;
            if(tokens[i].value === "[") recurseOnSet = true;
        } else if(tokens[i].isToken && [")", "]"].includes(tokens[i].value) && !isSet && !(recurseOnSet && tokens[i].value === ")")) {
            if(startPos === -1) throw new Error("The input contains an invalid sequence.");

            if(depth === 1) {
                out.push(...Recurse(tokens.slice(startPos + 1, i), {startToken: tokens[startPos]}));
            }
            depth--;

            recurseOnSet = false;
        }
        else if(depth === 0) {
            let token = tokens[i];

            if(!isSet){
                if(["*", "+", "?", "{"].includes(token.value) && !curRepeat) {
                    const popped = out.pop();
                    if(popped.tag === "match" && popped.params.startsWith("\"") && popped.params.endsWith("\"")) {
                        const sub = popped.params.substring(1, popped.params.length-1);

                        if(sub.length !== 1) {
                            out.push({tag: "match", params: "\""+sub.substring(0, sub.length-1)+"\""});
                            popped.params = "\""+sub.substring(sub.length-1)+"\"";
                        }
                    }

                    curRepeat = {tag: "repeat", params: token.value, body: [popped]};

                    if(token.value === "{") awaitingEnd = true;
                } else if(curRepeat && awaitingEnd){
                    curRepeat.params += token.value;

                    if(token.value === "}") {
                        awaitingEnd = false;
                    }
                } else if(curRepeat && token.value === "?") {
                    curRepeat.params = getRepeatParams(curRepeat.params + "?");
                    out.push(curRepeat);

                    curRepeat = null;
                    awaitingEnd = false;
                } else if(token.value === "|") {
                    if(curRepeat){
                        curRepeat.params = getRepeatParams(curRepeat.params);
                        out.push(curRepeat);

                        curRepeat = null;
                        awaitingEnd = false;
                    }

                    if(!onOR || !orOut) {
                        orOut = {tag: "or", body: []};
                        onOR = true;
                    }

                    orOut.body.push({tag: "orpart", body: out});
                    out = [];
                } else if(curRepeat) {
                    curRepeat.params = getRepeatParams(curRepeat.params);
                    out.push(curRepeat);

                    curRepeat = null;
                    awaitingEnd = false;

                    out.push(tokenToREXS(token, isSet));
                } else {
                    out.push(tokenToREXS(token, isSet));
                }
            } else if(isSet && outerTag) {
                if(token.value === "^" && i === 0){
                    outerTag.params = "not";
                } else if(token.value === "-" && i !== 0 && i !== tokens.length-1) {
                    out.push({tag: "to"});
                } else if(token.isToken && !["]", "\\", "^", "-"].includes(token.value)) {
                    out.push(tokenToREXS(token, isSet));
                } else {
                    out.push({tag: "match", params: "\""+unEscape(token.value)+"\""});
                }
            } else {
                if(curRepeat){
                    curRepeat.params = getRepeatParams(curRepeat.params);
                    out.push(curRepeat);

                    curRepeat = null;
                    awaitingEnd = false;
                }

                out.push({tag: "match", params: "\""+unEscape(token.value)+"\""});
            }
        }

        if(depth < 0){
            throw new Error("The input contains an invalid sequence.");
        }
    }

    if(depth !== 0) throw new Error("The input contains an invalid sequence.");

    if(curRepeat){
        curRepeat.params = getRepeatParams(curRepeat.params);
        out.push(curRepeat);
    }
    if(onOR) {
        orOut.body.push({tag: "orpart", body: out});
        out = [orOut];
    }
    if(outerTag) {
        outerTag.body = out;
        out = [outerTag];
    }

    return out;
}

interface RecurseData {
    startToken: Token;
}

interface REXSData {
    tag: string;
    params?: string;
    body?: REXSData[];
}

const tokenToREXS = (token: Token, isSet: boolean) : REXSData => {
    const character = Object.keys(CharactersMap).filter(key => CharactersMap[key] === token.value);
    if(character.length > 0) return {tag: "match", params: character[0]};

    const assertion = Object.keys(AssertionMap).filter(key => AssertionMap[key] === token.value);
    if(assertion.length > 0 && !isSet) return {tag: "assert", params: assertion[0]};

    if(token.value.startsWith("\\c")){
        return {tag: "match", params: "CONTROL, " + token.value.substring(2)};
    }
    if(token.value.startsWith("\\x")){
        return {tag: "match", params: "HEX, " + token.value.substring(2)};
    }
    if(token.value.startsWith("\\u")){
        return {tag: "match", params: "HEX, " + token.value.substring(2)};
    }
    if(token.value.startsWith("\\")){
        const parse = parseInt(token.value.substring(1));

        if(!isNaN(parse)){
            if(parse === 0){
                return {tag: "match", params: "NULL"};
            } else {
                return {tag: "backref", params: token.value.substring(1)};
            }
        }
    }

    return {tag: "match", params: "\""+unEscape(token.value)+"\""};
}

const getRepeatParams = (params: string) : string => {
    let startVal: string = "";
    let endVal: string = "";
    let greedy: string = "";

    if(params.startsWith("*")){
        startVal = "0";
        endVal = "inf";
    }
    if(params.startsWith("+")){
        startVal = "1";
        endVal = "inf";
    }
    if(params.startsWith("?")){
        startVal = "0";
        endVal = "1";
    }

    if(params.startsWith("{")){
        const split = params.substring(1, params.length-1).split(",");

        if(split.length === 1){
            startVal = split[0];
        }
        if(split.length === 2){
            startVal = split[0];
            if(split[1]){
                endVal = split[1];
            } else {
                endVal = "inf";
            }
        }
    }

    if(params.length > 1 && params[params.length-1] === "?"){
        greedy = "nongreedy";
    }

    return [startVal, endVal, greedy].filter(Boolean).join(", ");
}

//expressions/unescape.rexs
const unEscape = (val: string) : string => {
    return val.replace(/(?<!\\)(?:\\\\)*\\(.)/g, "$1").replace(/\\\\/g, "\\");
}

//expressions/tokenizer.rexs
const groupTokenizerChain = new TokenizerChain(new RegexTokenizer(/(?<!\\)(?:\\\\)*((?:[\*\.\^\$\|\[\]\-\(\)\+\?\{\}\,<=!:]|\\d|\\D|\\w|\\W|\\s|\\S|\\t|\\r|\\n|\\v|\\f|\[\\b\]|\\\d|\\c[A-Z]|\\x(?:[0-9a-f]){2}|\\u(?:[0-9a-f]){4}|\\b|\\B))/g)).token(new CustomTokenizer(token => {
    let out = [];

    if(token.length > 2) {
        const value = token.replace(/\\\\/g, "");
        token = token.substring(0, token.length - value.length);

        if (token) out.push({value: token, isToken: false});
        out.push({value: value, isToken: true});
    } else {
        out.push({value: token, isToken: true});
    }

    return out;
}));