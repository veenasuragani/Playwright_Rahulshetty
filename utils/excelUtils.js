const ExcelJs =require('exceljs');

class excelUtils{
    constructor(filepath){
        this.filePath = filepath;
    }

    async WriteExcel(change, searchValue, newValue){   
        const workbook = new ExcelJs.Workbook();
        await workbook.xlsx.readFile(this.filePath);
        const worksheet = workbook.getWorksheet("Sheet1");
        const output = await this.readlExcel(worksheet, searchValue);
        const cell = worksheet.getCell(output.row, output.column + change.column);
        cell.value = newValue;
        console.log(cell.value);
        await workbook.xlsx.writeFile(this.filePath);     
    }

    async readlExcel(worksheet, searchValue){
        let output = {row: -1, column: -1};
        worksheet.eachRow((row, rowNumber) => {
            row.eachCell((cell, colNumber) => {
                if(cell.value == searchValue){
                    output.row = rowNumber;
                    output.column = colNumber;
                    console.log(output);
                }
            });
        });
        return output;
    }
}

module.exports = {excelUtils};

