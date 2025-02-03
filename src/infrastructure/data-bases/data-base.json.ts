import fs from 'fs/promises';
import {DataExpenses} from "../../domain/interfaces/data-expenses";
import {SaveExpenseError} from "../../domain/exceptions/save-expense-error";


export class DataBaseFile {
    private fileName: string = 'expenses.json';
    async writeInFile(data: DataExpenses) {
        try {
            await fs.writeFile(this.fileName, JSON.stringify(data), {encoding: 'utf8'});
        } catch (e: any) {
            throw new SaveExpenseError(e);
        }
    }

    async readExpenses(): Promise<DataExpenses> {
        return new Promise(async(resolve, reject) => {
            const file = await fs.readFile(this.fileName, {encoding: 'utf-8', flag: 'r'});
            const expenses: DataExpenses = JSON.parse(file);
            resolve(expenses);
        })
    }
}