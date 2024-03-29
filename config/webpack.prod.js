const path = require("node:path");
const os = require("node:os");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const getStyleLoader = require("./getStyleLoader");

const threads = os.cpus().length; // cpu核数

module.exports = {
  // 入口文件
  entry: "./src/index.js",

  // 输出
  output: {
    path: path.resolve(__dirname, "../build"), // 打包根目录

    // 入口文件打包地方
    filename: "static/[name].js", // 相对路径
    chunkFilename: "static/js/[name].chunk.js",

    // 图片字体通过type: asset处理资源命名方式
    assetModuleFilename: "static/media/[hash:10][ext][query]",
    clean: true, // 打包前清空打包目录
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
            // generator: {
            //   filename: "static/[hash][ext][query]",
            // },
          },
          // 打包静态资源（字体图标，音频，视频）
          {
            test: /\.(ttf|woff2?|mp3|mp4|avi)$/,
            type: "asset/resource",
            // generator: {
            //   filename: "static/[hash][ext][query]",
            // },
          },

          // babel
          {
            test: /\.js$/i,
            // exclude: "/node_modules",
            include: path.resolve(__dirname, "../src"),
            use: [
              // 开启多进程
              {
                loader: "thread-loader",
                options: {
                  works: threads, // 进程数量
                },
              },
              {
                loader: "babel-loader",
                options: {
                  // presets: ["@babel/preset-env"],
                  cacheDirectory: true, // 开启babel缓存
                  cacheCompression: true, // 关闭缓存文件压缩
                  plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
                },
              },
            ],
          },
        ],
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
      filename: "static/css/[name].css",
      chunkFilename: "static/css/[name].chunk.css",
    }),

    // pwa
    new WorkboxPlugin.GenerateSW({
      // 这些选项帮助快速启用 ServiceWorkers
      // 不允许遗留任何“旧的” ServiceWorkers
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],

  optimization: {
    // 压缩
    minimizer: [
      // 压缩css
      new CssMinimizerPlugin(),
      // 压缩js
      new TerserWebpackPlugin({
        parallel: threads,
      }),
    ],

    // 代码分割块
    splitChunks: {
      // chunks: "all",
      // 其他都用默认值
      // minSize: 20000,
      // minRemainingSize: 0,
      // minChunks: 1,
      // maxAsyncRequests: 30,
      // maxInitialRequests: 30,
      // enforceSizeThreshold: 50000,
      // cacheGroups: {
      //   defaultVendors: {
      //     test: /[\\/]node_modules[\\/]/,
      //     priority: -10,
      //     reuseExistingChunk: true,
      //   },
      //   default: {
      //     minChunks: 2,
      //     priority: -20,
      //     reuseExistingChunk: true,
      //   },
      // },
    },
  },

  // 生产 | 开发
  mode: "production",
  devtool: "source-map",
};
