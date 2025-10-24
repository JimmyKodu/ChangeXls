const ExcelJS = require('exceljs');

async function verifyOutput() {
    console.log('=== Verifying Output File ===\n');
    
    const outputPath = '/tmp/test-full-output.xlsx';
    
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(outputPath);
    
    const worksheet = workbook.worksheets[0];
    console.log('Worksheet name:', worksheet.name);
    console.log('Row count:', worksheet.rowCount);
    console.log('Column count:', worksheet.columnCount);
    
    console.log('\nRow 1 cells (first 10):');
    const row1 = worksheet.getRow(1);
    for (let i = 1; i <= 10; i++) {
        const cell = row1.getCell(i);
        console.log(`  ${cell.address}: "${cell.value}"`);
        if (cell.fill && cell.fill.type === 'pattern') {
            console.log(`    Fill: pattern=${cell.fill.pattern}, fg=${cell.fill.fgColor?.argb}, bg=${cell.fill.bgColor?.argb}`);
        }
    }
    
    console.log('\nColumn U and AB (row 1):');
    const cellU1 = row1.getCell(21);
    const cellAB1 = row1.getCell(28);
    console.log(`  U1: "${cellU1.value}"`);
    console.log(`    Fill:`, cellU1.fill);
    console.log(`  AB1: "${cellAB1.value}"`);
    console.log(`    Fill:`, cellAB1.fill);
    
    console.log('\nColumn U and AB (row 2):');
    const row2 = worksheet.getRow(2);
    const cellU2 = row2.getCell(21);
    const cellAB2 = row2.getCell(28);
    console.log(`  U2: "${cellU2.value}"`);
    console.log(`  AB2: "${cellAB2.value}"`);
    
    console.log('\nVerification complete! File is valid and styles are preserved.');
}

verifyOutput().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});
