import count from "./js/count";
import sum from "./js/sum";
import { mul } from "./js/math";

// import "core-js"; // 完整引入
import "core-js/es/promise"; // 按需引入

import "./css/style.css";
import "./css/common.less";
import "./css/common.scss";
import "./css/iconfont.css";

console.log(count(3, 2));
console.log(sum(3, 2));
console.log(mul(2, 3));

const arr = [1, 23, 4];

console.log(arr.includes(4));
