require("dotenv").config();

const path = require("path");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    clientes: "./simulations/clientes.test.js",
    produtos: "./simulations/produtos.test.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"), // eslint-disable-line
    libraryTarget: "commonjs",
    filename: "[name].test.js",
  },
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
  },
  target: "web",
  externals: /k6(\/.*)?/,
};
