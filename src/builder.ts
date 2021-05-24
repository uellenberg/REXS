import {ParseAssertion, ParseMatch} from "./builderHelpers";

/**
 * Build a regular expression.
 * @param callback {ExpressionBuilderCallback} - is a callback where the expression is created in.
 * @param options {ExpressionBuilderOptions} - are the options for the expression builder.
 */
export const ExpressionBuilder = (callback: ExpressionBuilderCallback, options?: ExpressionBuilderOptions) => {
    let expression = "";

    let start = "";
    let end = "";

    callback({
        Match: (character) => {
            expression += ParseMatch(character);
        },
        Assert: (assertion) => {
            expression += ParseAssertion(assertion);
        },
        PositiveLookahead: (callback) => {
            const temp = expression;
            expression = "";

            callback();

            end += "(?=" + expression + ")";

            expression = temp;
        },
        NegativeLookahead: (callback) => {
            const temp = expression;
            expression = "";

            callback();

            end += "(?!" + expression + ")";

            expression = temp;
        },
        PositiveLookbehind: (callback) => {
            const temp = expression;
            expression = "";

            callback();

            start += "(?<=" + expression + ")";

            expression = temp;
        },
        NegativeLookbehind: (callback) => {
            const temp = expression;
            expression = "";

            callback();

            start += "(?<!" + expression + ")";

            expression = temp;
        },
        OR: (...callbacks) => {
            const temp = expression;
            expression = "";

            let values: string[] = [];

            for (let callback of callbacks) {
                callback();

                values.push("(?:" + expression + ")");

                expression = "";
            }

            expression = temp + "(?:" + values.join("|") + ")";
        },
        InSet: (callback) => {
            const temp = expression;
            expression = "";

            callback();

            expression = temp + "[" + expression + "]";
        },
        NotInSet: (callback) => {
            const temp = expression;
            expression = "";

            callback();

            expression = temp + "[^" + expression + "]";
        },
        To: () => {
            expression += "-";
        },
        Group: (callback) => {
            const temp = expression;
            expression = "";

            callback();

            expression = temp + "(" + expression + ")";
        },
        BackRef: (index) => {
            expression += "\\" + index;
        },
        Repeat: (callback, options) => {
            const temp = expression;
            expression = "";

            callback();

            expression = temp + "(?:" + expression + options.repeatChars + ")";
        }
    });

    return "/" + start + expression + end + "/";
}

/**
 * The functions used to build a regular expression.
 */
export interface ExpressionBuilderFunctions {
    /**
     * Match something.
     */
    Match: Match;
    /**
     * Make an assertion.
     */
    Assert: Assert;
    /**
     * Ensure that something appears after the expression.
     */
    PositiveLookahead: EmptyCallback;
    /**
     * Ensure that something does not appear after the expression.
     */
    NegativeLookahead: EmptyCallback;
    /**
     * Ensure that something appears before the expression.
     */
    PositiveLookbehind: EmptyCallback;
    /**
     * Ensure that something does not appear before the expression.
     */
    NegativeLookbehind: EmptyCallback;
    /**
     * Match one thing or another.
     */
    OR: OR;
    /**
     * Match something in a set of matches.
     */
    InSet: EmptyCallback;
    /**
     * Match something not in a set of matches.
     */
    NotInSet: EmptyCallback;
    /**
     * Used in sets; match any character between the match before and the match after this one (inclusive).
     */
    To: Function;
    /**
     * Creates a capturing group.
     */
    Group: EmptyCallback;
    /**
     * Match the value of a previous capturing group, by its zero-based ID.
     */
    BackRef: BackRef;
    /**
     * Repeat a match.
     */
    Repeat: Repeat;
}

export type ExpressionBuilderCallback = (functions: ExpressionBuilderFunctions) => void;

/**
 * The options for the expression builder.
 */
export interface ExpressionBuilderOptions {

}

/**
 * Special characters that can be used in matches.
 */
export enum Characters {
    ANY,
    DIGIT,
    NON_DIGIT,
    ALPHANUM,
    NON_ALPHANUM,
    SPACE,
    NON_SPACE,
    HTAB,
    VTAB,
    RETURN,
    LINEFEED,
    FORMFEED,
    BACKSPACE,
    NULL
}

export namespace Characters {
    /**
     * Match a control character.
     * @param caret {string} - is a one-length character from A-Z indicating the control character.
     */
    export const Control = (caret: string) : LiteralCharacterInterface => {
        if(caret.length !== 1 || !/[A-Z]/.test(caret.toUpperCase())) throw new Error("The caret must be a character in A-Z.");

        return LiteralCharacter("\\c"+caret.toUpperCase());
    }

    /**
     * Match a character by its character code
     * @param hex {string} - is a two-length or four-length string of hexadecimal digits indicating the character code.
     */
    export const Hex = (hex: string) : LiteralCharacterInterface => {
        if(![2, 4].includes(hex.length) || !/^[0-9a-fA-F]{2}$/.test(hex)) throw new Error("The hex must be two or four characters in 0-9 or A-F");

        return LiteralCharacter((hex.length === 2 ? "\\x" : "\\u")+hex.toLowerCase());
    }
}

/**
 * Match a character literally, without escaping.
 * @param character {string} - the character being matched.
 */
export const LiteralCharacter = (character: string) : LiteralCharacterInterface => {
    return {character};
}

export interface LiteralCharacterInterface {
    character: string;
}

/**
 * An assertion.
 */
export enum Assertion {
    START,
    END,
    WORD_BOUNDARY,
    NOT_WORD_BOUNDARY
}

/**
 * Options for a repeat.
 */
export namespace RepeatOptions {
    /**
     * Repeat zero or more times.
     * @param greedy {boolean} - if set to true, will match as many times as possible, otherwise as least times as possible.
     */
    export const ZeroOrMore = (greedy: boolean = true) : RepeatOptionsInterface => {
        return {repeatChars: "*" + (greedy ? "" : "?")};
    }

    /**
     * Repeat one or more times.
     * @param greedy {boolean} - if set to true, will match as many times as possible, otherwise as least times as possible.
     */
    export const OneOrMore = (greedy: boolean = true) : RepeatOptionsInterface => {
        return {repeatChars: "+" + (greedy ? "" : "?")};
    }

    /**
     * Repeat zero or one times.
     */
    export const ZeroOrOne = () : RepeatOptionsInterface => {
        return {repeatChars: "?"};
    }

    /**
     * Repeat exactly some amount of times.
     * @param count {number} - the amount of times to repeat.
     */
    export const Exactly = (count: number) : RepeatOptionsInterface => {
        return {repeatChars: "{" + count + "}"};
    }

    /**
     * Repeat at least some amount of times.
     * @param count {number} - the minimum amount of times to repeat.
     */
    export const AtLeast = (count: number) : RepeatOptionsInterface => {
        return {repeatChars: "{" + count + ",}"};
    }

    /**
     * Repeat between some amount of times and another amount of times (inclusive).
     * @param count1 {number} - the lower bounds for the amount of times to repeat.
     * @param count2 {number} - the upper bounds for the amount of times to repeat.
     */
    export const Between = (count1: number, count2: number) : RepeatOptionsInterface => {
        return {repeatChars: "{" + count1 + "," + count2 + "}"};
    }
}

export interface RepeatOptionsInterface {
    repeatChars: string;
}

export type Match = (character: Characters | LiteralCharacterInterface | string) => void;

export type Assert = (assertion: Assertion) => void;

export type EmptyCallback = (callback: Function) => void;

export type OR = (...callbacks: Function[]) => void;

export type BackRef = (index: number) => void;

export type Repeat = (callback: Function, options: RepeatOptionsInterface) => void;