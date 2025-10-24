# 使用示例 / Usage Example

## 快速开始 / Quick Start

### 1. 准备 XLS 文件 / Prepare your XLS file

确保您的文件是 `.xls` 格式（Excel 97-2003），而不是 `.xlsx`。

Make sure your file is in `.xls` format (Excel 97-2003), not `.xlsx`.

**如何转换 / How to convert:**
- 在 Excel 中打开文件 / Open the file in Excel
- 文件 → 另存为 / File → Save As
- 选择格式：Excel 97-2003 工作簿 (*.xls) / Choose format: Excel 97-2003 Workbook (*.xls)

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

下载的文件名称格式：`原文件名_swapped.xls`

The downloaded file will be named: `original_filename_swapped.xls`

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

**Q: 为什么只支持 .xls 不支持 .xlsx？**
**Q: Why only .xls and not .xlsx?**

A: 当前版本专门设计用于处理 .xls 格式。如果您有 .xlsx 文件，请先在 Excel 中转换为 .xls 格式。
A: The current version is specifically designed for .xls format. If you have .xlsx files, please convert them to .xls in Excel first.

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

A: 基本格式会保留，但复杂的公式可能会丢失。建议在处理前备份原文件。
A: Basic formatting is preserved, but complex formulas might be lost. We recommend backing up your original file before processing.

## 技术支持 / Technical Support

如遇到问题，请在 GitHub 仓库提交 Issue：
If you encounter issues, please submit an issue on the GitHub repository:

https://github.com/JimmyKodu/ChangeXls/issues
