const { WebpackRunPlugin, WebpackDonePlugin, loader1, loader2 } = require("./webpack.config");

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [loader1, loader2],
      },
    ],
  },
  plugins: [new WebpackRunPlugin(), new WebpackDonePlugin()],
};
