# ChangeXls - XLS列交换工具

一个简单的Web应用，用于交换Excel XLS文件中的U列和AB列数据。

A simple web application to swap columns U and AB in Excel XLS files.

## 功能特点 / Features

- ✅ 支持导入 .xls 文件（Excel 97-2003格式）
- ✅ 自动交换U列（第21列）和AB列（第28列）的数据
- ✅ 生成新的 .xls 文件供下载
- ✅ 支持拖放上传
- ✅ 双语界面（中文/英文）
- ✅ 纯前端实现，无需后端服务器

## 使用方法 / Usage

### 在线使用 / Online Usage

1. 将项目托管到GitHub Pages或任何静态网站托管服务
2. 打开 `index.html` 文件
3. 上传您的 .xls 文件（拖放或点击选择）
4. 点击"处理文件"按钮
5. 自动下载处理后的文件

### 本地使用 / Local Usage

1. 克隆或下载此仓库
2. 用浏览器直接打开 `index.html` 文件
3. 上传您的 .xls 文件
4. 点击处理按钮
5. 下载处理后的文件

```bash
# 克隆仓库
git clone https://github.com/JimmyKodu/ChangeXls.git

# 进入目录
cd ChangeXls

# 用浏览器打开 index.html
# Windows: start index.html
# macOS: open index.html
# Linux: xdg-open index.html
```

## 技术栈 / Tech Stack

- HTML5
- CSS3
- JavaScript (ES6+)
- [SheetJS (xlsx.js)](https://sheetjs.com/) - Excel文件处理库

## 列说明 / Column Information

- **U列** = 第21列 (Column 21)
- **AB列** = 第28列 (Column 28)

本应用会交换这两列的所有数据，包括格式和内容。

This application swaps all data between these two columns, including formatting and content.

## 浏览器兼容性 / Browser Compatibility

- ✅ Chrome/Edge (推荐 / Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ 其他现代浏览器 / Other modern browsers

## 注意事项 / Notes

- 只支持 .xls 格式（Excel 97-2003）
- 所有处理都在浏览器中完成，文件不会上传到服务器
- 原始文件不会被修改，会生成新文件下载

## License

MIT License