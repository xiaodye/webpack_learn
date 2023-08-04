const less = require("less");

// 这里接受的参数是less源代码

function lessLoader(lessSource) {
  let css;

  // 这里看着像是异步的，其实是同步的
  // 这里less.render其实也就是把less解析成AST，然后再生成css
  less.render(lessSource, { filename: this.resource }, (err, output) => {
    css = output.css;
  });

  return css;
}

module.exports = lessLoader;
