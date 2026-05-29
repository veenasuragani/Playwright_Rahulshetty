const{test, expect} = require('@playwright/test');
const {excelUtils} = require('../utils/excelUtils');

test('Download and upload test', async ({page}) => {
    const textSearch = "Banana";
    const updateValue = "2000";
    await page.goto('https://rahulshettyacademy.com/upload-download-test/');
    const downloadPromise = await page.waitForEvent('download');
    await page.getByRole('button', {name: 'Download'}).click();
    await downloadPromise;    
    const excel = new excelUtils("C:\\Users\\Veenasri\\Downloads\\download.xlsx");
    await excel.WriteExcel( {row:0, column:2}, textSearch, updateValue);
    await page.locator('#fileinput').click();
    await page.locator('#fileinput').setInputFiles("C:\\Users\\Veenasri\\Downloads\\download.xlsx"); 
    const desiredRow = await page.getByRole('row').filter({ has: page.getByText(textSearch) });
    await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue);   
});