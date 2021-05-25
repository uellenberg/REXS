import {CustomTokenizer, RecursiveMap, RegexTokenizer, Token, TokenizerChain} from "parselib";

export const Decompile = (input: string) : string => {
    let split = input.split("/");
    split.shift();

    const flags = split.pop();
    //TODO: add flags

    const tokens = groupTokenizerChain.run(split.join("/"));

    //TODO: format parsed regex
    return JSON.stringify(JSON.stringify(Recurse(tokens)));
}

//I don't even want to think about this code ever again.
const Recurse = (tokens: Token[], data?: RecurseData) : REXSData[] => {
    const stringSeq = tokens.map(token => token.value).join("");

    let outerTag: REXSData = null;

    let isSet = false;

    if(data && data.startToken.value === "(") {
        if(stringSeq.startsWith("?:")){
            tokens = tokens.slice(2);
        } else if(stringSeq.startsWith("?=")) {
            outerTag = {tag: "ahead"};
            tokens = tokens.slice(2);
        } else if(stringSeq.startsWith("?!")) {
            outerTag = {tag: "ahead", params: "not"};
            tokens = tokens.slice(2);
        } else if(stringSeq.startsWith("?<=")) {
            outerTag = {tag: "behind"};
            tokens = tokens.slice(3);
        } else if(stringSeq.startsWith("?<!")) {
            outerTag = {tag: "behind", params: "not"};
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
                out.push(curRepeat);

                curRepeat = null;
                awaitingEnd = false;
            }

            if (depth === 0) startPos = i;
            depth++;
            if(tokens[i].value === "[") recurseOnSet = true;
        } else if(tokens[i].isToken && [")", "]"].includes(tokens[i].value) && !isSet) {
            if(startPos === -1) throw new Error("The input contains an invalid sequence.");

            if(depth === 1) {
                out.push(...Recurse(tokens.slice(startPos + 1, i), {startToken: tokens[startPos]}));
            }
            depth--;

            recurseOnSet = false;
        }
        else if(depth === 0) {
            let token = tokens[i];

            if(token.isToken && !isSet){
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
                    if(token.value === "}") {
                        curRepeat.params += "}";
                        awaitingEnd = false;
                    }
                } else if(curRepeat && token.value === "?") {
                    curRepeat.params += "?";
                    out.push(curRepeat);

                    curRepeat = null;
                    awaitingEnd = false;
                } else if(curRepeat) {
                    out.push(curRepeat);

                    curRepeat = null;
                    awaitingEnd = false;

                    out.push({tag: "match", params: token.value});
                } else if(token.value === "|") {
                    if(!onOR || !orOut) {
                        orOut = {tag: "or", body: []};
                        onOR = true;
                    }

                    orOut.body.push({tag: "orpart", body: out});
                    out = [];
                } else {
                    out.push({tag: "match", params: token.value});
                }
            } else if(isSet && outerTag) {
                if(token.value === "^" && i === 0){
                    outerTag.params = "not";
                } else if(token.value === "-" && i !== 0 && i !== tokens.length-1) {
                    out.push({tag: "to"});
                } else {
                    out.push({tag: "match", params: "\""+token.value+"\""});
                }
            } else {
                if(curRepeat){
                    out.push(curRepeat);

                    curRepeat = null;
                    awaitingEnd = false;
                }

                //TODO: handle special characters
                out.push({tag: "match", params: "\""+token.value+"\""});
            }
        }

        if(depth < 0){
            throw new Error("The input contains an invalid sequence.");
        }
    }

    if(depth !== 0) throw new Error("The input contains an invalid sequence.");

    if(curRepeat) out.push(curRepeat);
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

//expressions/tokenizer.rexs
const groupTokenizerChain = new TokenizerChain(new RegexTokenizer(/(?<!\\)(?:\\\\)*((?:[\*\.\^\$\|\[\]\-\(\)\+\?\{\}\,]|\\d|\\D|\\w|\\W|\\s|\\S|\\t|\\r|\\n|\\v|\\f|\[\\b\]|\\\d|\\c[A-]|\\x(?:[0-9a-f]){2}|\\u(?:[0-9a-f]){4}|\\b|\\B))/g)).token(new CustomTokenizer(token => {
    let out = [];

    if(token.length > 2) {
        const value = token.substring(token.length - 1);
        token = token.substring(0, token.length - 1);

        if (token) out.push({value: token, isToken: false});
        out.push({value: value, isToken: true});
    } else {
        out.push({value: token, isToken: true});
    }

    return out;
}));