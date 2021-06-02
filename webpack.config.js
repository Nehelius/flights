const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        index: "./src/index.js"
    },
    output: { 
      path: path.join(__dirname, "public")
    },
    module: {
      rules: [
          { 
              test: /\.(js|jsx)$/, 
              exclude: /node_modules/, 
              use: ["babel-loader"]
          },
          {
              test: /\.(css|scss)$/,
              use: ["style-loader", "css-loader"],
          },
          { 
              test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
              use: ["file-loader"] 
          },
      ],
  },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html",
        }),
    ],
};