import {CustomTokenizer, RecursiveMap, RegexTokenizer, Token, TokenizerChain} from "parselib";
import {Assertion, Characters, ExpressionBuilder} from "../builder";

export const Compile = (input: string) => {
    let before = "";
    let beforeNot = "";
    let after = "";
    let afterNot = "";

    let flags = {i: false, g: false, m: false, s: false, u: false, y: false};

    return "/" + before + beforeNot + RecursiveMap<string>(tokenizerChain.run(FixSemicolons(input)), input => !input.isToken && input.value === "{", input => !input.isToken && input.value === "}", input => {
        switch (input.value) {
            case "repeat":
                return "repeat-" + ProcessRepeatParams(input.data.split(",").map(x => x.trim().toLowerCase()));
            case "group":
                return "group";
            case "or":
                return "or";
            case "orpart":
                return "orpart";
            case "set":
                return "set-" + (input.data.split(",").map(x => x.trim().toLowerCase()).includes("not") ? "not" : "");
            case "before":
                return "before-" + (input.data.split(",").map(x => x.trim().toLowerCase()).includes("not") ? "not" : "");
            case "after":
                return "after-" + (input.data.split(",").map(x => x.trim().toLowerCase()).includes("not") ? "not" : "");
            case "flag":
                if(!Object.keys(flags).includes(input.data)) throw new Error("A flag was given that does not exist: " + input.data);

                flags[input.data] = true;
                return "";
            default:
                return HandleFunction(input);
        }
    }, (input, startToken, endToken) => {
        let split = input.shift().split("-");

        const name = split.shift();
        const data = split.join("-");

        switch(name){
            case "repeat":
                const join = input.join("");
                if(join.length === 1) return join + data;

                return "(?:" + join + ")" + data;
            case "group":
                return "(" + input.join("") + ")";
            case "or":
                return "(?:" + input.join("|") + ")";
            case "orpart":
                return input.join("");
            case "set":
                return "[" + (data === "not" ? "^" : "") + input.join("") + "]";
            case "before":
                if(data === "not") beforeNot = "(?<!" + input.join("") + ")";
                else before = "(?<=" + input.join("") + ")";
                return "";
            case "after":
                if(data === "not") afterNot = "(?!" + input.join("") + ")";
                else after = "(?=" + input.join("") + ")";
                return "";
            default:
                return input.join("");
        }
    }).join("") + after + afterNot + "/" + Object.keys(flags).filter(key => flags[key]).join("");
}

const HandleFunction = (token: Token) : string => {
    const out = ExpressionBuilder(functions => {
        const functionsFormatted = Object.keys(functions).map(x => x.toLowerCase());

        const value = token.value.trim();

        const args = token.data.trim();

        if(!functionsFormatted.includes(value)) throw new Error("An invalid function was given: " + token.value);

        switch(value){
            case "match":
                let funValue: Characters | string = null;

                if((args.startsWith("\"") && args.endsWith("\"")) || (args.startsWith("'") && args.endsWith("'"))){
                    funValue = args.substring(1, args.length-1);
                } else {
                    const val = args.toUpperCase().split(",")[0];

                    if(!(val in Characters)) throw new Error("An invalid character was given: " + token.data);

                    funValue = Characters[val];
                }

                if(typeof(funValue) === "function") funValue = (<Function>funValue)(args.split(",")[1].trim());

                functions.Match(funValue);
                break;
            case "assert":
                let funValue1: Assertion = null;

                const val = args.toUpperCase();

                if(!(val in Assertion)) throw new Error("An invalid assertion was given: " + token.data);

                funValue1 = <Assertion><unknown>Assertion[val];

                functions.Assert(funValue1);
                break;
            case "to":
                functions.To();
                break;
            case "backref":
                functions.BackRef(args.trim());
                break;
        }
    });

    return out.substring(1, out.length-1);
}

const ProcessRepeatParams = (args: string[]) : string => {
    let body = "";
    let greedy = "";

    if(args.length < 1) throw new Error("The repeat function requires arguments.");

    const from = ParseRepeatInt(args[0]);

    if(args.length > 1 && args[1] !== "nongreedy") {
        const to = ParseRepeatInt(args[1]);

        if(from === Infinity) {
            throw new Error("The \"from\" argument in repeat must be less than Infinity.");
        }

        if(from >= to) {
            throw new Error("The \"from\" argument in repeat must be less than the \"to\" argument.");
        }

        if(from < 0 || to < 0){
            throw new Error("The \"from\" and \"to\" arguments in repeat must be greator than or equal to zero.");
        }

        switch("" + from + to){
            case "0Infinity":
                body = "*";
                break;
            case "1Infinity":
                body = "+";
                break;
            case "01":
                body = "?";
                break;
            default:
                if(to === Infinity){
                    body = "{" + from + ",}";
                } else {
                    body = "{" + from + "," + to + "}";
                }
                break;
        }
    } else {
        body = "{" + from + "}";
    }

    if(args.includes("nongreedy")) greedy = "?";

    return body + greedy;
}

const ParseRepeatInt = (int: string) : number => {
    const cleaned = int.trim().toLowerCase();

    const parsed = parseInt(cleaned);
    if(!isNaN(parsed)) return parsed;

    switch(cleaned){
        case "inf":
        case "infinity":
        case "forever":
        case "more":
        case "max":
            return Infinity;
        case "one":
            return 1;
        case "zero":
        case "none":
            return 0;
    }

    throw new Error("Unknown argument for repeat: " + int);
}

const FixSemicolons = (input: string) : string => {
    return input.split("\n").map(val => {
        const fixed = val.trim();

        if(!fixed) return null;

        if([";", "{", "}"].includes(fixed.substring(fixed.length-1))) return fixed;

        return fixed + ";";
    }).filter(val => val !== null).join("");
}

const tokenizerChain = new TokenizerChain(new RegexTokenizer(/([a-zA-Z]*?)\s*?\((.*?)\)\s*?[;{]/g)).token(new CustomTokenizer(input => {
    let out = [];

    let split = input.trim().split("(");

    const name = split.shift();

    let join = split.join("(");
    if(join.endsWith("{")) {
        join = join.substring(0, join.length-1);
        out.push({value: "{", isToken: false});
    }

    const params = join.substring(0, join.length-2);

    out.push({value: name, data: params, isToken: true});

    return out;
})).text(new CustomTokenizer(input => {
    let out = [];

    while(input.startsWith("}") || input.startsWith("{")){
        out.push({value: input.substring(input.length-1), isToken: false});
        input = input.substring(0, input.length-1);
    }

    return out;
}));