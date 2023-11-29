import clipboardy from "clipboardy";
import fs from "fs";

let lastClipboardContent = clipboardy.readSync();
let times = 1;
let isClipboardContentString = true;

// 定义一个函数用于保存剪切板内容到txt文件
const saveClipboardToTxt = (text) => {
  try {
    fs.writeFileSync("D:\\clipboard.txt", text + "\n");
    console.log(times + ". 剪切板内容已保存到clipboard.txt文件中: ");
    isClipboardContentString = true;
    console.log(text.slice(0, 50) + " ......");
    times++;
  } catch (err) {
    console.error("保存文件时出现错误: " + err);
  }
};

// 定时检查剪切板内容变化并保存到txt文件
const intervalId = setInterval(() => {
  try {
    const text = clipboardy.readSync();
    if (text !== lastClipboardContent) {
      saveClipboardToTxt(text);
      lastClipboardContent = text;
    }
  } catch (error) {
    if (!isClipboardContentString) {
      return;
    }
    console.log("跳过...当前剪切板的内容不是string ");
    isClipboardContentString = false;
  }
}, 1000); // 每秒检查一次

console.log("正在监听剪切板内容…");

// 程序结束时清理定时器
process.on("SIGINT", () => {
  clearInterval(intervalId);
  console.log("程序结束，清理定时器");
  process.exit();
});
