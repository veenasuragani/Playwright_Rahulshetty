import ExcelJs from 'exceljs';

export class excelUtils{
    filePath:string;
    constructor(filepath:string){
        this.filePath = filepath;
    }

    async WriteExcel(change: {column: number}, searchValue: string, newValue: string){   
        const workbook = new ExcelJs.Workbook();
        await workbook.xlsx.readFile(this.filePath);
        const worksheet = workbook.getWorksheet("Sheet1");
        const output = await this.readlExcel(worksheet, searchValue);
        const cell = worksheet.getCell(output.row, output.column + change.column);
        cell.value = newValue;
        console.log(cell.value);
        await workbook.xlsx.writeFile(this.filePath);     
    }

    async readlExcel(worksheet: any, searchValue: string){
        let output = {row: -1, column: -1};
        worksheet.eachRow((row: any, rowNumber: number) => {
            row.eachCell((cell: any, colNumber: number) => {
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


