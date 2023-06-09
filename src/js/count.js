export default function count(a, b) {
  return a - b;
}

new Promise((resolve) => {
  setTimeout(() => {
    resolve("fulfilled");
  }, 1000);
}).then((res) => console.log(res));
