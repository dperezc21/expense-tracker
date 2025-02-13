import {Expense} from "./Expense";
import {Category, CategoryType} from "./category";

export interface ID {
    id: number;
}

export type ExpenseId = Expense["id"];
export type CategoryId = Category["id"];