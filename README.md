<h1 align="center">REXS</h1>
<p align="center">
    <a href="https://www.codefactor.io/repository/github/uellenberg/REXS">
        <img src="https://www.codefactor.io/repository/github/uellenberg/REXS/badge" alt="CodeFactor">
    </a>
    <a href="https://codecov.io/gh/uellenberg/REXS">
        <img src="https://codecov.io/gh/uellenberg/REXS/branch/master/graph/badge.svg?token=DK9G4WE5OA" alt="Codecov">
    </a>
    <img src="https://img.shields.io/github/workflow/status/uellenberg/REXS/Build%20and%20Test/master" alt="Build">
    <img src="https://img.shields.io/npm/dt/rexs" alt="Downloads">
</p>
REXS is a language to create regular expressions. It can be used to create more readable and easy-to-modify expressions that compile to clean and readable regular expressions.

For more information on REXS' syntax (or how to use it), take a look at https://esolangs.org/wiki/REXS.

## Example
An example usage of REXS can be to match on any URL that starts with http:// or https://, then match any subdomains, followed by the domain and .com:
```rexs
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

assert(END);
```
This example will be compiled to `/^https?:\/\/(?:.+?\.)*?(.+?\.com)$/`.
