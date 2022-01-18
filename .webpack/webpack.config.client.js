const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

/** @type { import('webpack').Configuration } */
module.exports = {
  mode: "development",
  target: "web",
  entry: {},
  output: {
    filename: "[name].js",
    path: path.resolve("dist", "static"),
    publicPath: "/static",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
            configFile: "tsconfig.json",
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  optimization: {
    minimize: false,
  },
  devtool: "inline-source-map",
  stats: "errors-only",
  plugins: [new CleanWebpackPlugin(), new WebpackManifestPlugin()],
};
