//将\替换成/
function toUnixPath(filePath) {
  return filePath.replace(/\\/g, "/");
}

//获取文件路径
function tryExtensions(modulePath, extensions) {
  if (fs.existsSync(modulePath)) {
    return modulePath;
  }
  for (let i = 0; i < extensions?.length; i++) {
    let filePath = modulePath + extensions[i];
    if (fs.existsSync(filePath)) {
      return filePath;
    }
  }
  throw new Error(`无法找到${modulePath}`);
}

module.exports = {
  toUnixPath,
  tryExtensions,
};
