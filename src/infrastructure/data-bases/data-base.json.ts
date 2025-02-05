import fs from 'fs/promises';
import {DataExpenses} from "../../domain/interfaces/data-expenses";
import {SaveInFileError} from "../../domain/exceptions/save-in-file-error";
import {DataCategory} from "../../domain/interfaces/data-category";

abstract class DataBaseFile<T> {
    protected fileName: string = '';
    protected constructor(fileName: string) {
        this.fileName = fileName;
    }
    async writeInFile(data: T) {
        try {
            await fs.writeFile(this.fileName, JSON.stringify(data), {encoding: 'utf8'});
        } catch (e: any) {
            throw new SaveInFileError(e);
        }
    }

    async readExpenses(): Promise<T> {
        return new Promise(async(resolve, reject) => {
            const file = await fs.readFile(this.fileName, {encoding: 'utf-8', flag: 'r'});
            const expenses: T = JSON.parse(file);
            resolve(expenses);
        })
    }
}

export class DataBaseExpense extends DataBaseFile<DataExpenses> {
    constructor() {
        super('expenses.json');
    }
}

export class DataBaseCategory extends DataBaseFile<DataCategory> {
    constructor() {
        super('category.json');
    }
}