const XLSX = require('xlsx');
const ExcelJS = require('exceljs');
const fs = require('fs');

const testFile = '/home/runner/work/ChangeXls/ChangeXls/出货单2025-10-22 09_18_58(1).xls';

// Function to apply styles from SheetJS XLS workbook to ExcelJS workbook
function applyXLSStyles(xlsWorkbook, excelWorkbook) {
    const sheetName = xlsWorkbook.SheetNames[0];
    const xlsSheet = xlsWorkbook.Sheets[sheetName];
    const excelSheet = excelWorkbook.worksheets[0];
    
    if (!xlsSheet || !excelSheet) return;
    
    // Get the range of the sheet
    const range = XLSX.utils.decode_range(xlsSheet['!ref'] || 'A1');
    
    console.log('Applying styles to range:', xlsSheet['!ref']);
    
    // Iterate through all cells in the range
    for (let R = range.s.r; R <= range.e.r; R++) {
        for (let C = range.s.c; C <= range.e.c; C++) {
            const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
            const xlsCell = xlsSheet[cellAddress];
            
            if (!xlsCell || !xlsCell.s) continue;
            
            // Get the corresponding ExcelJS cell (ExcelJS uses 1-based indexing)
            const excelCell = excelSheet.getRow(R + 1).getCell(C + 1);
            const style = xlsCell.s;
            
            console.log(`\nApplying style to cell ${cellAddress} (ExcelJS: ${excelCell.address})`);
            console.log('  Original style:', JSON.stringify(style, null, 2));
            
            // Apply fill/background color
            if (style.fgColor || style.bgColor || style.patternType) {
                const fill = { type: 'pattern' };
                
                // Map pattern type
                if (style.patternType) {
                    const patternMap = {
                        'solid': 'solid',
                        'gray125': 'gray125',
                        'gray0625': 'gray0625',
                        'mediumGray': 'mediumGray',
                        'lightGray': 'lightGray',
                        'darkGray': 'darkGray'
                    };
                    fill.pattern = patternMap[style.patternType] || 'solid';
                } else {
                    fill.pattern = 'solid';
                }
                
                // Apply foreground color (text area color in pattern fills)
                if (style.fgColor && style.fgColor.rgb) {
                    fill.fgColor = { argb: 'FF' + style.fgColor.rgb };
                }
                
                // Apply background color (background area color in pattern fills)
                if (style.bgColor && style.bgColor.rgb) {
                    fill.bgColor = { argb: 'FF' + style.bgColor.rgb };
                }
                
                excelCell.fill = fill;
                console.log('  Applied fill:', fill);
            }
            
            // Apply font properties
            if (style.fontName || style.sz || style.color || style.bold || style.italic || style.underline) {
                const font = {};
                
                if (style.fontName) font.name = style.fontName;
                if (style.sz) font.size = style.sz;
                if (style.bold) font.bold = true;
                if (style.italic) font.italic = true;
                if (style.underline) font.underline = true;
                
                // Apply font color
                if (style.color && style.color.rgb) {
                    font.color = { argb: 'FF' + style.color.rgb };
                }
                
                excelCell.font = font;
                console.log('  Applied font:', font);
            }
            
            // Apply alignment
            if (style.alignment) {
                const alignment = {};
                if (style.alignment.horizontal) alignment.horizontal = style.alignment.horizontal;
                if (style.alignment.vertical) alignment.vertical = style.alignment.vertical;
                if (style.alignment.wrapText) alignment.wrapText = style.alignment.wrapText;
                excelCell.alignment = alignment;
                console.log('  Applied alignment:', alignment);
            }
            
            // Apply borders
            if (style.border) {
                const border = {};
                const borderStyleMap = {
                    'thin': 'thin',
                    'medium': 'medium',
                    'thick': 'thick',
                    'double': 'double',
                    'dotted': 'dotted',
                    'dashed': 'dashed'
                };
                
                ['top', 'bottom', 'left', 'right'].forEach(side => {
                    if (style.border[side]) {
                        border[side] = {
                            style: borderStyleMap[style.border[side].style] || 'thin'
                        };
                        if (style.border[side].color && style.border[side].color.rgb) {
                            border[side].color = { argb: 'FF' + style.border[side].color.rgb };
                        }
                    }
                });
                
                if (Object.keys(border).length > 0) {
                    excelCell.border = border;
                    console.log('  Applied border:', border);
                }
            }
        }
    }
}

async function testStyleFix() {
    console.log('=== Testing Style Fix ===\n');
    
    // Read XLS with SheetJS
    const xlsData = fs.readFileSync(testFile);
    const xlsWorkbook = XLSX.read(xlsData, { 
        type: 'buffer',
        cellStyles: true
    });
    
    // Convert to XLSX buffer
    const xlsxBuffer = XLSX.write(xlsWorkbook, { 
        bookType: 'xlsx', 
        type: 'buffer',
        cellStyles: true
    });
    
    // Load into ExcelJS
    const excelWorkbook = new ExcelJS.Workbook();
    await excelWorkbook.xlsx.load(xlsxBuffer);
    
    console.log('Before applying styles:');
    const worksheet = excelWorkbook.worksheets[0];
    const row1 = worksheet.getRow(1);
    const cellA1 = row1.getCell(1);
    console.log('Cell A1 fill:', cellA1.fill);
    console.log('Cell A1 font:', cellA1.font);
    
    // Apply styles
    console.log('\n=== Applying Styles ===\n');
    applyXLSStyles(xlsWorkbook, excelWorkbook);
    
    console.log('\n=== After applying styles ===\n');
    console.log('Cell A1 fill:', cellA1.fill);
    console.log('Cell A1 font:', cellA1.font);
    
    // Save the output
    const outputPath = '/tmp/test-output.xlsx';
    await excelWorkbook.xlsx.writeFile(outputPath);
    console.log(`\nOutput saved to: ${outputPath}`);
    
    // Verify a few cells
    console.log('\n=== Verification ===');
    for (let colIdx = 1; colIdx <= 5; colIdx++) {
        const cell = row1.getCell(colIdx);
        console.log(`\nCell ${cell.address}:`);
        console.log('  Value:', cell.value);
        console.log('  Fill:', cell.fill);
        console.log('  Font:', cell.font);
    }
}

testStyleFix().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});
