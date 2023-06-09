const path = require("node:path");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const getStyleLoader = require("./getStyleLoader");

module.exports = {
  // 入口文件
  entry: "./src/index.js", // 相对路径（从项目根目录开始）

  // 输出
  output: {
    // 开发模式没有输出目录
    path: undefined,

    // 入口文件打包地方
    filename: "js/index.js",
  },

  // 加载器
  module: {
    rules: [
      {
        // 每个文件只能被其中一个loader配置处理
        oneOf: [
          {
            test: /\.css$/i,
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
            // exclude: "/node_modules",
            include: path.resolve(__dirname, "../src"),
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env"],
              },
            },
          },
        ],
      },
    ],
  },

  // 插件
  plugins: [
    new EslintWebpackPlugin({
      // 检查哪些文件
      context: path.resolve(__dirname, "../src"),
    }),
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
  ],

  // 开发服务器，开发模式下，不会输出到dist，在内存中编译
  devServer: {
    host: "localhost",
    port: 3001,
    open: true, // 是否自动打开浏览器,
    hot: true, // 热模块更替
  },

  // 生成 | 开发
  mode: "development",
  devtool: "cheap-module-source-map",
};
