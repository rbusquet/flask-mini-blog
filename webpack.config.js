const path = require("path");
const ManifestPlugin = require("webpack-manifest-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  mode: "development",
  entry: {
    main: "./frontend/src/react/main/index",
    "main-vue": "./frontend/src/vue/main/index.js",
    css: "./frontend/src/vue/main/css/style.css"
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
    new VueLoaderPlugin(),
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
        use: ["vue-style-loader", "style-loader", "css-loader"]
      },
      {
        test: /\.vue$/,
        use: "vue-loader"
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".vue"]
  }
};
