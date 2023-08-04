const webpack = require("./webpack");
const webpackOptions = require("./webpack.config.js");
const compiler = webpack(webpackOptions);

compiler.run((err, status) => {
  console.log(err);
  console.log(
    status.toJson({
      assets: true, //打印本次编译产出的资源
      chunks: true, //打印本次编译产出的代码块
      modules: true, //打印本次编译产出的模块
    })
  );
});
