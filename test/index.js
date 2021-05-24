const {ExpressionBuilder, Assertion, RepeatOptions, Characters} = require("../dist/cjs/index");
const {expect} = require("chai");

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