import {ExpenseRepository} from "../domain/expense-repository";
import {Expense} from "../domain/interfaces/Expense";

export class ExpenseFileDataBase implements ExpenseRepository {

    deleteExpense(expenseId: number): Promise<number> {
        return Promise.resolve(0);
    }

    getAllExpenses(): Promise<Expense[]> {
        return Promise.resolve([]);
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