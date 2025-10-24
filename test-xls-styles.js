const XLSX = require('xlsx');
const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

const testFile = '/home/runner/work/ChangeXls/ChangeXls/出货单2025-10-22 09_18_58(1).xls';

async function analyzeXLSStyles() {
    console.log('=== Analyzing XLS File Styles ===\n');
    
    // Read the XLS file with SheetJS
    console.log('Step 1: Reading XLS file with SheetJS...');
    const xlsData = fs.readFileSync(testFile);
    const xlsWorkbook = XLSX.read(xlsData, { 
        type: 'buffer',
        cellStyles: true,
        cellDates: true,
        cellNF: true
    });
    
    const sheetName = xlsWorkbook.SheetNames[0];
    const sheet = xlsWorkbook.Sheets[sheetName];
    
    console.log('Sheet name:', sheetName);
    console.log('Sheet range:', sheet['!ref']);
    
    // Check for styles in the original XLS
    console.log('\nChecking for style information in XLS...');
    let hasStyles = false;
    for (let cell in sheet) {
        if (cell[0] === '!') continue;
        if (sheet[cell].s) {
            hasStyles = true;
            console.log(`Cell ${cell} has style:`, JSON.stringify(sheet[cell].s, null, 2));
            break;
        }
    }
    
    if (!hasStyles) {
        console.log('No style information found in cellStyles mode.');
    }
    
    // Step 2: Convert to XLSX
    console.log('\nStep 2: Converting XLS to XLSX buffer with SheetJS...');
    const xlsxBuffer = XLSX.write(xlsWorkbook, { 
        bookType: 'xlsx', 
        type: 'buffer',
        cellStyles: true
    });
    
    // Step 3: Load with ExcelJS
    console.log('Step 3: Loading XLSX buffer with ExcelJS...');
    const excelWorkbook = new ExcelJS.Workbook();
    await excelWorkbook.xlsx.load(xlsxBuffer);
    
    const worksheet = excelWorkbook.worksheets[0];
    console.log('Worksheet name:', worksheet.name);
    console.log('Row count:', worksheet.rowCount);
    console.log('Column count:', worksheet.columnCount);
    
    // Check first few rows for style information
    console.log('\nChecking styles in first 5 rows after conversion:');
    for (let rowNum = 1; rowNum <= Math.min(5, worksheet.rowCount); rowNum++) {
        const row = worksheet.getRow(rowNum);
        console.log(`\nRow ${rowNum}:`);
        
        for (let colNum = 1; colNum <= Math.min(5, worksheet.columnCount); colNum++) {
            const cell = row.getCell(colNum);
            if (cell.value) {
                console.log(`  Cell ${cell.address}: value="${cell.value}"`);
                if (cell.font) console.log(`    Font:`, cell.font);
                if (cell.fill) console.log(`    Fill:`, cell.fill);
                if (cell.border) console.log(`    Border:`, cell.border);
                if (cell.alignment) console.log(`    Alignment:`, cell.alignment);
                if (cell.numFmt) console.log(`    NumFmt:`, cell.numFmt);
            }
        }
    }
    
    console.log('\n=== Analysis Complete ===');
}

analyzeXLSStyles().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});
