/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const ManifestPlugin = require("webpack-manifest-plugin");

module.exports = {
  mode: "development",
  entry: {
    main: "./frontend/src/react/main/index",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "server/static"),
    devtoolModuleFilenameTemplate: "file://[absolute-resource-path]",
    pathinfo: false,
  },
  devServer: {
    contentBase: "./static",
    sockPort: 8080,
  },
  plugins: [
    new ManifestPlugin({
      fileName: "../instance/webpack-manifest.json",
      writeToFileEmit: true,
    }),
  ],
  optimization: {
    runtimeChunk: { name: "manifest" },
    splitChunks: {
      name: "common",
      chunks: "all",
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
};
