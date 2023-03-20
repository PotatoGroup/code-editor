const path = require("path");
module.exports = {
  mode: "production",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.min.js",
    library: {
      name: "CodeEditor",
      type: "umd",
    },
    globalObject: "this",
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".jsx", ".ts", ".js"],
  },
  externals: {
    react: 'React',
    "react-dom/client": 'ReactDOM',
  },
};
