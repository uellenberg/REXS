const path = require("path");

module.exports = {
    entry: "./dist/esm/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "REXS.min.js",
        library: "REXS"
    },
    mode: "production"
};