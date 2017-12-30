const marked = require("marked");

const memoArea = document.querySelector("#memoArea");
const previewArea = document.querySelector("#previewArea");

memoArea.addEventListener("input", e => {
  previewArea.innerHTML = marked(e.target.value);
});
