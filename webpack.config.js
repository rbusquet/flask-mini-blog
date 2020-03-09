const path = require("path");
const ManifestPlugin = require("webpack-manifest-plugin");

module.exports = {
  mode: "development",
  entry: {
    main: "./frontend/src/react/main/index",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    devtoolModuleFilenameTemplate: "file://[absolute-resource-path]",
    pathinfo: false
  },
  devServer: {
    contentBase: "./dist",
    sockPort: 8080
  },
  plugins: [
    new ManifestPlugin({
      fileName: "../instance/webpack-manifest.json",
      writeToFileEmit: true
    })
  ],
  optimization: {
    runtimeChunk: { name: "manifest" },
    splitChunks: {
      name: "common",
      chunks: "all"
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            "@babel/preset-react",
            "@babel/preset-flow"
          ],
          plugins: ["@babel/plugin-transform-runtime"]
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  }
};
