class DemoPlugin {
  apply(compiler) {
    compiler.hooks.done.tap("DemoPlugin", () => {
      console.log("DemoPlugin：编译结束了😳😳😳");
    });
  }
}

module.exports = DemoPlugin;
