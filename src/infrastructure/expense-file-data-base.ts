import {ExpenseRepository} from "../domain/repositories/expense-repository";
import {Expense} from "../domain/interfaces/Expense";
import {DataBaseFile} from "./data-bases/data-base.json";

export class ExpenseFileDataBase implements ExpenseRepository {
    private dataBase = new DataBaseFile();

    deleteExpense(expenseId: number): Promise<number> {
        return Promise.resolve(0);
    }

    getAllExpenses(): Promise<Expense[]> {
        return new Promise(async(resolve, reject) => {
            const expenses = await this.dataBase.readExpenses();
            resolve(expenses.expenses);
        });
    }

    getSummaryExpense(): Promise<number> {
        return Promise.resolve(0);
    }

    saveExpense(expense: Expense): Promise<void> {
        return Promise.resolve(undefined);
    }

    updateExpense(expense: Expense, params: Map<string, string>): Promise<void> {
        return Promise.resolve(undefined);
    }

}