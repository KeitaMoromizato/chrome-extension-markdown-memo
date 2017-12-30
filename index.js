const marked = require("marked");

const memoArea = document.querySelector("#memoArea");
const previewArea = document.querySelector("#previewArea");

const defaultValue = {
  markedownMemo: ""
};

chrome.storage.local.get(defaultValue, data => {
  memoArea.value = data.markedownMemo;
});

memoArea.addEventListener("input", e => {
  const text = e.target.value;
  previewArea.innerHTML = marked(text);

  chrome.storage.local.set({ markedownMemo: text }, () => {
    console.log("Saved.");
  });
});

// TODO storage change listener
