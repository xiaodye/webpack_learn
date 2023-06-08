const path = require("node:path");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniExtractPlugin = require("mini-extract-plugin");

module.exports = {
  // 入口文件
  entry: "./src/main.js", // 相对路径（从项目根目录开始）

  // 输出
  output: {
    // 开发模式没有输出目录
    path: undefined,

    // 入口文件打包地方
    filename: "js/main.js",
  },

  // 加载器
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/i,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },

      // 打包静态资源(图片)
      {
        test: /\.(png|jpe?g|gif|webp)$/,
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

    new MiniExtractPlugin({}),
  ],

  // 开发服务器，开发模式下，不会输出到dist，在内存中编译
  devServer: {
    host: "localhost",
    port: 3001,
    open: true, // 是否自动打开浏览器
  },

  // 生成 | 开发
  mode: "development",
};
