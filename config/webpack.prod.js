const path = require("node:path");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

function getStyleLoader() {
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
}

module.exports = {
  // 入口文件
  entry: "./src/index.js",

  // 输出
  output: {
    path: path.resolve(__dirname, "../build"), // 打包根目录

    // 入口文件打包地方
    filename: "./js/index.js", // 相对路径
    clean: true, // 打包前清空打包目录
  },

  // 加载器
  module: {
    rules: [
      {
        test: /\.css$/i,
        // use: ["style-loader", "css-loader"],
        use: getStyleLoader(),
      },
      {
        test: /\.less$/i,
        use: [...getStyleLoader(), "less-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [...getStyleLoader(), "sass-loader"],
      },

      // 打包静态资源(图片)
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 1 * 1024,
          },
        },
        generator: {
          filename: "static/[hash][ext][query]",
        },
      },
      // 打包静态资源（字体图标，音频，视频）
      {
        test: /\.(ttf|woff2?|mp3|mp4|avi)$/,
        type: "asset/resource",
        generator: {
          filename: "static/[hash][ext][query]",
        },
      },

      // babel
      {
        test: /\.js$/i,
        exclude: "/node_modules",
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },

  // 插件
  plugins: [
    // eslint检查
    new EslintWebpackPlugin({
      // 检查哪些文件
      context: path.resolve(__dirname, "../src"),
    }),

    // 打包html文件
    new HtmlWebpackPlugin({
      // 以*为模板，创建新的html文件
      // 特点：
      // 1. 结构和原来一一致
      // 2. 自动引入打包资源
      template: path.resolve(__dirname, "../public/index.html"),
    }),

    // 单独输出css文件，而不是 style标签内嵌在html中
    new MiniCssExtractPlugin({
      filename: "css/index.css",
    }),

    // 压缩css
    new CssMinimizerPlugin(),
  ],

  // 生产 | 开发
  mode: "production",
};
