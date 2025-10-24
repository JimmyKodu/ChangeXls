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
    
    const range = XLSX.utils.decode_range(xlsSheet['!ref'] || 'A1');
    
    for (let R = range.s.r; R <= range.e.r; R++) {
        for (let C = range.s.c; C <= range.e.c; C++) {
            const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
            const xlsCell = xlsSheet[cellAddress];
            
            if (!xlsCell || !xlsCell.s) continue;
            
            const excelCell = excelSheet.getRow(R + 1).getCell(C + 1);
            const style = xlsCell.s;
            
            // Apply fill/background color
            if (style.fgColor || style.bgColor || style.patternType) {
                const fill = { type: 'pattern' };
                
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
                
                if (style.fgColor && style.fgColor.rgb) {
                    fill.fgColor = { argb: 'FF' + style.fgColor.rgb };
                }
                
                if (style.bgColor && style.bgColor.rgb) {
                    fill.bgColor = { argb: 'FF' + style.bgColor.rgb };
                }
                
                excelCell.fill = fill;
            }
            
            // Apply font properties
            if (style.fontName || style.sz || style.color || style.bold || style.italic || style.underline) {
                const font = {};
                
                if (style.fontName) font.name = style.fontName;
                if (style.sz) font.size = style.sz;
                if (style.bold) font.bold = true;
                if (style.italic) font.italic = true;
                if (style.underline) font.underline = true;
                
                if (style.color && style.color.rgb) {
                    font.color = { argb: 'FF' + style.color.rgb };
                }
                
                excelCell.font = font;
            }
            
            // Apply alignment
            if (style.alignment) {
                const alignment = {};
                if (style.alignment.horizontal) alignment.horizontal = style.alignment.horizontal;
                if (style.alignment.vertical) alignment.vertical = style.alignment.vertical;
                if (style.alignment.wrapText) alignment.wrapText = style.alignment.wrapText;
                excelCell.alignment = alignment;
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
                }
            }
        }
    }
}

async function testFullProcess() {
    console.log('=== Testing Full Process (with column swapping) ===\n');
    
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
    
    // Apply styles
    console.log('Applying styles...');
    applyXLSStyles(xlsWorkbook, excelWorkbook);
    
    const worksheet = excelWorkbook.worksheets[0];
    
    console.log('\nBefore column swap:');
    console.log('  U1 (col 21):', worksheet.getRow(1).getCell(21).value);
    console.log('  AB1 (col 28):', worksheet.getRow(1).getCell(28).value);
    console.log('  U2 (col 21):', worksheet.getRow(2).getCell(21).value);
    console.log('  AB2 (col 28):', worksheet.getRow(2).getCell(28).value);
    
    // Swap columns U (21) and AB (28)
    console.log('\nSwapping columns U (21) and AB (28)...');
    const maxRow = worksheet.rowCount || worksheet.actualRowCount || 1000;
    
    for (let rowNum = 1; rowNum <= maxRow; rowNum++) {
        const row = worksheet.getRow(rowNum);
        if (!row) continue;
        
        const cellU = row.getCell(21);  // Column U
        const cellAB = row.getCell(28); // Column AB
        
        // Store cell U properties
        const tempValue = cellU.value;
        const tempStyle = {
            font: cellU.font ? {...cellU.font} : undefined,
            fill: cellU.fill ? {...cellU.fill} : undefined,
            border: cellU.border ? {...cellU.border} : undefined,
            alignment: cellU.alignment ? {...cellU.alignment} : undefined,
            numFmt: cellU.numFmt,
            protection: cellU.protection ? {...cellU.protection} : undefined
        };
        
        // Copy AB to U
        cellU.value = cellAB.value;
        if (cellAB.font) cellU.font = cellAB.font;
        if (cellAB.fill) cellU.fill = cellAB.fill;
        if (cellAB.border) cellU.border = cellAB.border;
        if (cellAB.alignment) cellU.alignment = cellAB.alignment;
        if (cellAB.numFmt) cellU.numFmt = cellAB.numFmt;
        if (cellAB.protection) cellU.protection = cellAB.protection;
        
        // Copy temp (original U) to AB
        cellAB.value = tempValue;
        if (tempStyle.font) cellAB.font = tempStyle.font;
        if (tempStyle.fill) cellAB.fill = tempStyle.fill;
        if (tempStyle.border) cellAB.border = tempStyle.border;
        if (tempStyle.alignment) cellAB.alignment = tempStyle.alignment;
        if (tempStyle.numFmt) cellAB.numFmt = tempStyle.numFmt;
        if (tempStyle.protection) cellAB.protection = tempStyle.protection;
        
        row.commit();
    }
    
    // Swap column widths
    const colU = worksheet.getColumn(21);
    const colAB = worksheet.getColumn(28);
    const tempWidth = colU.width;
    colU.width = colAB.width;
    colAB.width = tempWidth;
    
    console.log('\nAfter column swap:');
    console.log('  U1 (col 21):', worksheet.getRow(1).getCell(21).value);
    console.log('  AB1 (col 28):', worksheet.getRow(1).getCell(28).value);
    console.log('  U2 (col 21):', worksheet.getRow(2).getCell(21).value);
    console.log('  AB2 (col 28):', worksheet.getRow(2).getCell(28).value);
    
    // Check that styles are preserved after swap
    console.log('\nChecking styles after swap:');
    const cellU1 = worksheet.getRow(1).getCell(21);
    const cellAB1 = worksheet.getRow(1).getCell(28);
    console.log('  U1 fill:', cellU1.fill);
    console.log('  AB1 fill:', cellAB1.fill);
    
    // Save the output
    const outputPath = '/tmp/test-full-output.xlsx';
    await excelWorkbook.xlsx.writeFile(outputPath);
    console.log(`\nOutput saved to: ${outputPath}`);
    console.log('You can open this file in Excel to verify the styles are preserved.');
}

testFullProcess().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});
