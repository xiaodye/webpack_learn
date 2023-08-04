function styleLoader(cssSource) {
  let script = `
    let style = document.createElement("style");
    style.innerHTML = ${JSON.stringify(cssSource)};
    document.head.appendChild(style);
  `;

  return script;
}

module.exports = styleLoader;
