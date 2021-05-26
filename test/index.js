const {ExpressionBuilder, Assertion, RepeatOptions, Characters, Compile, Decompile} = require("../dist/cjs/index");
const {expect} = require("chai");
const fs = require("fs");

describe("Compiler", () => {
    context("with simple URL test", () => {
        it("should return the correct regular expression.", () => {
            const expression = Compile(`
assert(START);

match("http");

repeat(0, 1) {
    match("s");
}

match("://");

repeat(0, inf, nongreedy) {
    repeat(1, inf, nongreedy) {
        match(ANY);
    }
    match(".");
}

group() {
    repeat(1, inf, nongreedy) {
        match(ANY);
    }

    match(".com");
}

assert(END);`);

            expect(expression).to.eql("/^https?:\\/\\/(?:.+?\\.)*?(.+?\\.com)$/");
        });
    });
});

describe("Decompiler", () => {
    context("with a simple URL test", () => {
        it("should return the correct regular expression.", () => {
            expect(Compile(Decompile("/^https?:\\/\\/(?:.+?\\.)*?(.+?\\.com)$/g"))).to.eql("/^https?:\\/\\/(?:.+?\\.)*?(.+?\\.com)$/g");
        });
    });

    //https://gist.github.com/jacksonfdam/3000275
    const lines = fs.readFileSync("test/expressions.txt", "utf-8").replace(/\r/g, "").split("\n");

    for (let i = 0; i < lines.length; i+=3) {
        context("with expression #" + (Math.floor(i/3)+1) + " (line " + (i+1) + ")", () => {
            it("should return the correct regular expression.", () => {
                expect(Compile(Decompile(lines[i]))).to.eql(lines[i+1]);
            });
        });
    }
});

describe("ExpressionBuilder", () => {
    context("with simple URL test", () => {
        it("should return the correct regular expression.", () => {
            const expression = ExpressionBuilder((functions) => {
                functions.Assert(Assertion.START);

                functions.Match("http");

                functions.Repeat(() => {
                    functions.Match("s");
                }, RepeatOptions.ZeroOrOne());

                functions.Match("://");

                functions.Repeat(() => {
                    functions.Repeat(() => {
                        functions.Match(Characters.ANY);
                    }, RepeatOptions.OneOrMore(false));
                    functions.Match(".");
                }, RepeatOptions.ZeroOrMore(false));

                functions.Repeat(() => {
                    functions.Match(Characters.ANY);
                }, RepeatOptions.OneOrMore(false));

                functions.Match(".com");

                functions.Assert(Assertion.END);
            });

            expect(expression).to.eql("/^http(?:s?):\\/\\/(?:(?:.+?)\\.*?)(?:.+?)\\.com$/");
        });
    });
});