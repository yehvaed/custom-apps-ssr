const path = require("path");
const nodeExternals = require("webpack-node-externals");
const CopyPlugin = require("copy-webpack-plugin");

/** @type { import('webpack').Configuration } */
module.exports = {
  mode: "development",
  entry: {
    renderer: path.resolve("src", "renderer", "index.tsx"),
  },
  output: {
    filename: "[name].js",
    path: path.resolve("dist"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          configFile: "tsconfig.server.json",
        },
      },
    ],
  },
  target: "node",
  externals: [nodeExternals()],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  optimization: {
    minimize: false,
  },
  devtool: "inline-source-map",

  stats: "errors-only",
  plugins: [
    new CopyPlugin({
      patterns: [{ context: "src", from: "renderer/templates", to: "templates" }],
    }),
  ],
};
