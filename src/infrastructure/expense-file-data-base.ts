import {ExpenseRepository} from "../domain/repositories/expense-repository";
import {Expense} from "../domain/interfaces/Expense";
import {DataBaseFile} from "./data-bases/data-base.json";

export class ExpenseFileDataBase implements ExpenseRepository {
    private dataBase = new DataBaseFile();

    deleteExpense(expenseId: number): Promise<number> {
        return Promise.resolve(0);
    }

    getAllExpenses(): Promise<Expense[]> {
        return new Promise(async(resolve) => {
            const expenses = await this.dataBase.readExpenses();
            resolve(expenses.expenses);
        });
    }

    getSummaryExpense(): Promise<number> {
        return Promise.resolve(0);
    }

    saveExpense(description: string, amount: number): Promise<boolean> {
        return new Promise(async(resolve): Promise<void> => {
            const expensesList: Expense[] = await this.getAllExpenses();
            const expenseToSave: Expense = {
                amount, description, id: expensesList.length + 1, date: new Date
            }
            expensesList.push(expenseToSave);
            await this.dataBase.writeInFile({expenses: expensesList});
            resolve(true);
        });
    }

    updateExpense(expense: Expense): Promise<void> {
        return new Promise(async(resolve, reject) => {
            let expensesList: Expense[] = await this.getAllExpenses();
            expensesList = expensesList.map(value => value.id ? expense: value);
            await this.dataBase.writeInFile({expenses: expensesList});
        })
    }

    getExpenseById(expenseId: number): Promise<Expense> {
        return new Promise(async(resolve) => {
            const expenses: Expense[] = await this.getAllExpenses();
            const findExpense: Expense = expenses.find(value => value.id == expenseId ) as Expense;
            resolve(findExpense);
        });
    }

}