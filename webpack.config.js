const path = require("path");

module.exports = {
    entry: "./dist/esm/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "rexs.min.js",
        library: "REXS"
    },
    mode: "production"
};