# 使用示例 / Usage Example

## 快速开始 / Quick Start

### 1. 准备文件 / Prepare your file

本工具支持 `.xls` 和 `.xlsx` 两种格式：

This tool supports both `.xls` and `.xlsx` formats:

**✅ 推荐使用 XLSX 格式 / XLSX Format Recommended:**
- 完全保留所有格式（字体、颜色、边框等）
- Full style preservation (fonts, colors, borders, etc.)

**⚠️ XLS 格式限制 / XLS Format Limitations:**
- 数据正常交换，但字体和边框可能丢失
- Data swaps correctly, but fonts and borders may be lost

**如何转换 XLS 到 XLSX / How to convert XLS to XLSX:**
- 在 Excel 中打开 XLS 文件 / Open the XLS file in Excel
- 文件 → 另存为 / File → Save As
- 选择格式：Excel 工作簿 (*.xlsx) / Choose format: Excel Workbook (*.xlsx)
- 使用转换后的 XLSX 文件以保留完整格式 / Use the converted XLSX file for full formatting

### 2. 上传文件 / Upload file

有两种方式上传文件：
There are two ways to upload:

**方式一 / Method 1: 拖放 / Drag & Drop**
- 将文件拖到虚线框内 / Drag your file into the dashed box
- 释放鼠标 / Release the mouse

**方式二 / Method 2: 点击选择 / Click to Select**
- 点击虚线框 / Click on the dashed box
- 在文件浏览器中选择文件 / Select your file in the file browser

### 3. 处理文件 / Process file

- 点击"处理文件"按钮 / Click the "Process File" button
- 等待处理完成（通常只需几秒钟） / Wait for processing (usually takes a few seconds)
- 文件会自动下载 / The file will download automatically

### 4. 检查结果 / Check results

下载的文件名称格式：`原文件名_swapped.xlsx`

The downloaded file will be named: `original_filename_swapped.xlsx`

**注意 / Note**: 输出文件始终为 XLSX 格式 / Output is always in XLSX format

**验证交换 / Verify the swap:**
- 打开原始文件和处理后的文件 / Open both original and processed files
- 检查 U 列（第21列） / Check column U (21st column)
- 检查 AB 列（第28列） / Check column AB (28th column)
- 确认数据已交换 / Confirm data has been swapped

## 示例数据 / Example Data

**处理前 / Before:**

| A | B | ... | U | ... | AB |
|---|---|-----|------|-----|------|
| Row1 | Data1 | ... | U1 | ... | AB1 |
| Row2 | Data2 | ... | U2 | ... | AB2 |
| Row3 | Data3 | ... | U3 | ... | AB3 |

**处理后 / After:**

| A | B | ... | U | ... | AB |
|---|---|-----|------|-----|------|
| Row1 | Data1 | ... | AB1 | ... | U1 |
| Row2 | Data2 | ... | AB2 | ... | U2 |
| Row3 | Data3 | ... | AB3 | ... | U3 |

## 常见问题 / FAQ

**Q: XLS 和 XLSX 格式有什么区别？**
**Q: What's the difference between XLS and XLSX formats?**

A: 
- **XLSX（推荐）**: 现代格式，完全保留所有样式（字体、颜色、边框等）
- **XLS**: 旧格式，数据正常处理，但字体和边框信息会丢失

A: 
- **XLSX (Recommended)**: Modern format, fully preserves all styles (fonts, colors, borders, etc.)
- **XLS**: Legacy format, processes data correctly, but font and border information will be lost

**Q: 数据是否会上传到服务器？**
**Q: Is my data uploaded to a server?**

A: 不会。所有处理都在您的浏览器中完成，文件完全保留在本地。
A: No. All processing happens in your browser, files stay completely local.

**Q: 可以处理多大的文件？**
**Q: How large files can I process?**

A: 理论上没有限制，但非常大的文件（>10MB）可能需要较长处理时间。
A: Theoretically no limit, but very large files (>10MB) may take longer to process.

**Q: 除了 U 和 AB 列，其他列会改变吗？**
**Q: Will other columns besides U and AB be changed?**

A: 不会。只有 U 列和 AB 列的数据会互换，其他所有列保持不变。
A: No. Only columns U and AB are swapped, all other columns remain unchanged.

**Q: 格式和公式会保留吗？**
**Q: Are formatting and formulas preserved?**

A: 
- **XLSX 文件**: 完全保留所有格式、字体、颜色、边框、公式等
- **XLS 文件**: 数据和公式保留，但字体名称、大小、边框会使用默认样式
- 建议在处理前备份原文件

A: 
- **XLSX files**: Fully preserves all formatting, fonts, colors, borders, formulas, etc.
- **XLS files**: Data and formulas preserved, but font names, sizes, and borders use default styles
- We recommend backing up your original file before processing

## 技术支持 / Technical Support

如遇到问题，请在 GitHub 仓库提交 Issue：
If you encounter issues, please submit an issue on the GitHub repository:

https://github.com/JimmyKodu/ChangeXls/issues
