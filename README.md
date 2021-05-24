<h1 align="center">REXS</h1>
<p align="center">
    <a href="https://www.codefactor.io/repository/github/uellenberg/REXS">
        <img src="https://www.codefactor.io/repository/github/uellenberg/REXS/badge" alt="CodeFactor">
    </a>
    <a href="https://codecov.io/gh/uellenberg/REXS">
        <img src="https://codecov.io/gh/uellenberg/REXS/branch/master/graph/badge.svg?token=DK9G4WE5OA" alt="Codecov">
    </a>
    <img src="https://img.shields.io/github/workflow/status/uellenberg/REXS/Build%20and%20Test/master" alt="Build">
    <img src="https://img.shields.io/npm/dt/REXS" alt="Downloads">
</p>
REXS is a library that helps create regular expressions without knowing the syntax. It works by using functions to build regular expressions.

## Example
An example usage of REXS can be to match on any URL that starts with http:// or https://, then match any subdomains, followed by the domain and .com:
```javascript
const {ExpressionBuilder, Assertion, RepeatOptions, Characters} = require("rexs");

ExpressionBuilder((functions) => {
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
```
This example will be compiled to `/^http(?:s?):\/\/(?:(?:.+?)\.*?)(?:.+?)\.com$/`.