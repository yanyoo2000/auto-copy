import clipboardy from "clipboardy";
import fs from "fs";

let lastClipboardContent = clipboardy.readSync();
let count = 1
// 定义一个函数用于保存剪切板内容到txt文件
const saveClipboardToTxt = (text) => {
  try {
    fs.writeFileSync("D:\\clipboard.txt", text + "\n");
    console.log(count + ". 剪切板内容已保存到clipboard.txt文件中: ");
    console.log(text.slice(0,50) + ' ......');
    count++
  } catch (err) {
    console.error("保存文件时出现错误: " + err);
  }
};

// 定时检查剪切板内容变化并保存到txt文件
const intervalId = setInterval(() => {
  const text = clipboardy.readSync();
  if (text !== lastClipboardContent) {
    saveClipboardToTxt(text);
    lastClipboardContent = text;
  }
}, 1000); // 每秒检查一次

console.log("正在监听剪切板内容…");

// 程序结束时清理定时器
process.on('SIGINT', () => {
  clearInterval(intervalId);
  console.log("程序结束，清理定时器");
  process.exit();
});