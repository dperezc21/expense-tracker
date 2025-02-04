import {Expense} from "../interfaces/Expense";

export interface ExpenseRepository {
    saveExpense(description: string, amount: number): Promise<boolean>;
    updateExpense(expense: Expense): Promise<void>;
    getAllExpenses(): Promise<Expense[]>;
    getSummaryExpense(): Promise<number>;
    deleteExpense(expenseId: number): Promise<boolean>;
    getExpenseById(expenseId: number): Promise<Expense>;
}