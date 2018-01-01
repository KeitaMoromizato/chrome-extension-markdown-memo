const marked = require("marked");

const memoArea = document.querySelector("#memoArea");
const previewArea = document.querySelector("#previewArea");

const defaultValue = {
  markedownMemo: ""
};

chrome.storage.local.get(defaultValue, data => {
  memoArea.value = data.markedownMemo;
  preview(data.markedownMemo);
});

function preview(text) {
  previewArea.innerHTML = marked(text);
}

memoArea.addEventListener("input", e => {
  const text = e.target.value;
  preview(text);

  chrome.storage.local.set({ markedownMemo: text }, () => {
    console.log("Saved.");
  });
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === "local") {
    for (key in changes) {
      if (key === "markedownMemo") {
        chrome.tabs.getCurrent(tab => {
          if (!tab.active) {
            const text = changes[key].newValue;
            memoArea.value = text;
            preview(text);
          }
        });
      }
    }
  }
});
