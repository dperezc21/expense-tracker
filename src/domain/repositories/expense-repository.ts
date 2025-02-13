import {Expense} from "../interfaces/Expense";
import {Category, CategoryType} from "../interfaces/category";
import {ExpenseId} from "../interfaces/ID";

export interface ExpenseRepository {
    saveExpense(description: string, amount: number, category: Category): Promise<boolean>;
    updateExpense(id: ExpenseId, description: string, amount: number, category: CategoryType): Promise<void>;
    getAllExpenses(): Promise<Expense[]>;
    getSummaryExpense(): Promise<number>;
    deleteExpense(expenseId: ExpenseId): Promise<boolean>;
    getExpenseById(expenseId: ExpenseId): Promise<Expense>;
}