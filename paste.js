import fs from "fs";
import clipboardy from "clipboardy";

let targetFile = "\\\\Client\\D$\\clipboard.txt"

let lastFileContent = fs.readFileSync(targetFile, "utf8");
let count = 0

// 定义一个函数用于保存剪切板内容到txt文件
const writeTextToClipboard = () => {
  try {
    const newFileContent = fs.readFileSync(targetFile, "utf8");
    if (newFileContent !== lastFileContent || count===0) {
      clipboardy.writeSync(newFileContent);
      console.log(count + ". 文件内容已复制到剪切板");
      count++
      lastFileContent = newFileContent;
    }
  } catch (err) {
    console.error("复制文件时出现错误: " + err);
  }
};

writeTextToClipboard()
// 定时检查文件内容变化并复制到剪贴板
const intervalId = setInterval(() => {
  writeTextToClipboard()
}, 1000); // 每秒检查一次

console.log("正在监听文件内容变化...");

// 程序结束时清理定时器
process.on('SIGINT', () => {
  clearInterval(intervalId);
  console.log("程序结束，清理定时器");
  process.exit();
});
