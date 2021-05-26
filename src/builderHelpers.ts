import {Assertion, Characters, LiteralCharacterInterface} from "./builder";

export const CharactersMap = {
    ANY: ".",
    DIGIT: "\\d",
    NON_DIGIT: "\\D",
    ALPHANUM: "\\w",
    NON_ALPHANUM: "\\W",
    SPACE: "\\s",
    NON_SPACE: "\\S",
    HTAB: "\\t",
    VTAB: "\\v",
    RETURN: "\\r",
    LINEFEED: "\\n",
    FORMFEED: "\\f",
    BACKSPACE: "[\\b]",
    NULL: "(?:\\0)",
    QUOTE: "\""
}

export const ParseMatch = (character: Characters | LiteralCharacterInterface | string) : string => {
    if(typeof(character) === "number" && character in Characters){
        return CharactersMap[Characters[character]];
    }

    if(typeof(character) === "string"){
        return EscapeCharacter(character);
    }

    if(typeof(character) === "object" && isLiteralCharacterInterface(character)){
        return character.character;
    }

    throw new Error("Invalid input for match: " + character);
}

const isLiteralCharacterInterface = (object: any): object is LiteralCharacterInterface => {
    return "character" in object;
}

const EscapeCharacter = (character: string) : string => {
    return character.replace(/[-[\]{}()*+?.,\\\/^$|#]/g, '\\$&');
}

export const ParseAssertion = (assertion: Assertion) : string => {
    if(typeof(assertion) === "number" && assertion in Assertion){
        return AssertionMap[Assertion[assertion]];
    }

    throw new Error("Invalid input for assertion: " + assertion);
}

export const AssertionMap = {
    START: "^",
    END: "$",
    WORD_BOUNDARY: "\\b",
    NOT_WORD_BOUNDARY: "\\B"
}