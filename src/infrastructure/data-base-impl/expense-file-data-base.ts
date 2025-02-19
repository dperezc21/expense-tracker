import {ExpenseRepository} from "../../domain/repositories/expense-repository";
import {Expense} from "../../domain/interfaces/Expense";
import {DataBaseExpense} from "../data-bases/data-base.json";
import {Category, CategoryType} from "../../domain/interfaces/category";
import {ExpenseIdUtil} from "../../domain/utils/expense-id-util";
import {ExpenseId} from "../../domain/interfaces/ID";

export class ExpenseFileDataBase implements ExpenseRepository {
    private dataBase = new DataBaseExpense();

    deleteExpense(expenseId: number): Promise<boolean> {
        return new Promise(async(resolve, reject) => {
            let expensesList: Expense[] = await this.getAllExpenses();
            if(!expensesList.some(value => value.id == expenseId)) resolve(false);
            expensesList = expensesList.filter(value => value.id != expenseId);
            await this.dataBase.writeInFile({expenses: expensesList});
            resolve(true);
        })
    }

    getAllExpenses(): Promise<Expense[]> {
        return new Promise(async(resolve) => {
            const expenses = await this.dataBase.readExpenses();
            resolve(expenses.expenses);
        });
    }

    getSummaryExpense(): Promise<number> {
        return new Promise(async(resolve) => {
            const expenseList: Expense[] = await this.getAllExpenses();
            const expenseSummary: number = expenseList.reduce((value, current) => {
                value.amount += current.amount;
                return value
            }).amount;
            resolve(expenseSummary);
        })
    }

    saveExpense(description: string, amount: number, category: Category): Promise<boolean> {
        return new Promise(async(resolve): Promise<void> => {
            const expensesList: Expense[] = await this.getAllExpenses();
            const expenseToSave: Expense = {
                amount, description, id: ExpenseIdUtil.newExpenseId(expensesList), date: new Date, category
            }
            expensesList.push(expenseToSave);
            await this.dataBase.writeInFile({expenses: expensesList});
            resolve(true);
        });
    }

    updateExpense(expenseId: ExpenseId, description: string, amount: number, category: CategoryType): Promise<void> {
        return new Promise(async(resolve, reject) => {
            let expensesList: Expense[] = await this.getAllExpenses();
            const expense: Expense = {
                id: expenseId,
                amount,
                description,
                date: new Date(),
                category
            }
            expensesList = expensesList.map(value => value.id ? expense: value);
            await this.dataBase.writeInFile({expenses: expensesList});
            resolve();
        })
    }

    getExpenseById(expenseId: ExpenseId): Promise<Expense> {
        return new Promise(async(resolve) => {
            const expenses: Expense[] = await this.getAllExpenses();
            const findExpense: Expense = expenses.find(value => value.id == expenseId ) as Expense;
            resolve(findExpense);
        });
    }

}