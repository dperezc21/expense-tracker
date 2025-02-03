import {Expense} from "../interfaces/Expense";

export interface ExpenseRepository {
    saveExpense(description: string, amount: number): Promise<boolean>;
    updateExpense(expense: Expense, params: Map<string, string>): Promise<void>;
    getAllExpenses(): Promise<Expense[]>;
    getSummaryExpense(): Promise<number>;
    deleteExpense(expenseId: number): Promise<number>;
}