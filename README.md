# ChangeXls - XLS列交换工具

一个简单的Web应用，用于交换Excel XLS文件中的U列和AB列数据。

A simple web application to swap columns U and AB in Excel XLS files.

## 功能特点 / Features

- ✅ 支持导入 .xls 和 .xlsx 文件 / Support .xls and .xlsx files
- ✅ 自动交换U列（第21列）和AB列（第28列）的数据 / Swap columns U and AB
- ✅ 保留列宽、行高和合并单元格 / Preserve column widths, row heights, and merged cells
- ✅ 生成 .xlsx 文件供下载 / Generate .xlsx file for download
- ✅ 支持拖放上传 / Support drag and drop upload
- ✅ 双语界面（中文/英文）/ Bilingual interface (Chinese/English)
- ✅ 纯前端实现，无需后端服务器 / Pure front-end, no backend required

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
- [ExcelJS](https://github.com/exceljs/exceljs) - 完整Excel处理库（支持所有样式）/ Full Excel library with complete style support
- [SheetJS](https://sheetjs.com/) - XLS格式支持 / XLS format support

## 列说明 / Column Information

- **U列** = 第21列 (Column 21)
- **AB列** = 第28列 (Column 28)

本应用会交换这两列的所有数据。

This application swaps all data between these two columns.

### 样式保留 / Style Preservation

**XLSX文件（推荐）/ XLSX Files (Recommended):**
✅ 使用ExcelJS库，完全保留所有格式 / Full style preservation with ExcelJS:
- ✅ 单元格值和公式 / Cell values and formulas
- ✅ 单元格颜色（背景和字体）/ Cell colors (background and font)
- ✅ 字体样式（粗体、斜体、大小、字体名称）/ Font styles (bold, italic, size, font name)
- ✅ 单元格边框 / Cell borders
- ✅ 对齐方式 / Cell alignment
- ✅ 数字格式 / Number formats
- ✅ 列宽和行高 / Column widths and row heights
- ✅ 合并单元格 / Merged cells

**XLS文件（旧格式）/ XLS Files (Legacy Format):**
⚠️ **重要提示：**由于XLS是旧的二进制格式，JavaScript库无法完整提取字体和边框信息。
- ✅ 数据和基本结构完全保留 / Data and basic structure fully preserved  
- ✅ 列宽和行高保留 / Column widths and row heights preserved
- ⚠️ **字体信息（字体名称、大小、粗体等）会丢失** / Font info (name, size, bold, etc.) will be lost
- ⚠️ **边框信息会丢失** / Border info will be lost
- ⚠️ 处理后会使用默认格式 / Default formatting will be applied after processing

**💡 建议 / Recommendation:**
如需保留完整格式，请先在Microsoft Excel或LibreOffice中将XLS文件"另存为"XLSX格式，然后使用本工具处理。

For full formatting preservation, please use "Save As" in Microsoft Excel or LibreOffice to convert XLS files to XLSX format first, then use this tool.

## 浏览器兼容性 / Browser Compatibility

- ✅ Chrome/Edge (推荐 / Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ 其他现代浏览器 / Other modern browsers

## 注意事项 / Notes

- 支持 .xls 和 .xlsx 格式 / Support .xls and .xlsx formats
- 输出格式为 .xlsx / Output format is .xlsx
- 所有处理都在浏览器中完成，文件不会上传到服务器 / All processing is done in the browser, files are not uploaded
- 原始文件不会被修改，会生成新文件下载 / Original files are not modified, new files are generated
- XLS文件会自动转换为XLSX格式（保留所有样式）/ XLS files are automatically converted to XLSX format (all styles preserved)

## License

MIT License