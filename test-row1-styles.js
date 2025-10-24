const XLSX = require('xlsx');
const ExcelJS = require('exceljs');
const fs = require('fs');

const testFile = '/home/runner/work/ChangeXls/ChangeXls/出货单2025-10-22 09_18_58(1).xls';

async function checkRow1Styles() {
    console.log('=== Checking Row 1 Styles in Detail ===\n');
    
    // Read XLS with SheetJS
    const xlsData = fs.readFileSync(testFile);
    const xlsWorkbook = XLSX.read(xlsData, { 
        type: 'buffer',
        cellStyles: true,
        cellDates: true,
        cellNF: true
    });
    
    const sheetName = xlsWorkbook.SheetNames[0];
    const sheet = xlsWorkbook.Sheets[sheetName];
    
    console.log('Original XLS - Row 1 cells with styles:');
    for (let colIdx = 0; colIdx < 28; colIdx++) {
        const colName = XLSX.utils.encode_col(colIdx);
        const cellRef = colName + '1';
        const cell = sheet[cellRef];
        if (cell) {
            console.log(`\n${cellRef}: value="${cell.v || cell.w}"`);
            if (cell.s) {
                console.log('  Style:', JSON.stringify(cell.s, null, 2));
            } else {
                console.log('  No style information');
            }
        }
    }
    
    // Convert to XLSX
    console.log('\n\n=== After conversion to XLSX with ExcelJS ===\n');
    const xlsxBuffer = XLSX.write(xlsWorkbook, { 
        bookType: 'xlsx', 
        type: 'buffer',
        cellStyles: true
    });
    
    const excelWorkbook = new ExcelJS.Workbook();
    await excelWorkbook.xlsx.load(xlsxBuffer);
    
    const worksheet = excelWorkbook.worksheets[0];
    const row1 = worksheet.getRow(1);
    
    console.log('Row 1 in ExcelJS:');
    for (let colIdx = 1; colIdx <= 28; colIdx++) {
        const cell = row1.getCell(colIdx);
        if (cell.value) {
            console.log(`\n${cell.address}: value="${cell.value}"`);
            console.log('  Font:', cell.font || 'none');
            console.log('  Fill:', cell.fill || 'none');
            console.log('  Border:', cell.border || 'none');
            console.log('  Alignment:', cell.alignment || 'none');
        }
    }
}

checkRow1Styles().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});
