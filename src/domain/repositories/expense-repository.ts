import {Expense} from "../interfaces/Expense";
import {Category} from "../interfaces/category";

export interface ExpenseRepository {
    saveExpense(description: string, amount: number, category: Category): Promise<boolean>;
    updateExpense(expense: Expense): Promise<void>;
    getAllExpenses(): Promise<Expense[]>;
    getSummaryExpense(): Promise<number>;
    deleteExpense(expenseId: number): Promise<boolean>;
    getExpenseById(expenseId: number): Promise<Expense>;
}