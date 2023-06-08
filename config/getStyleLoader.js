const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function () {
  return [
    MiniCssExtractPlugin.loader,
    "css-loader",

    // postcss-loader需要在 css-loader之前，预处理器之后
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: ["postcss-preset-env"], // 能解决大多数样式兼容性问题
        },
      },
    },
  ];
};
