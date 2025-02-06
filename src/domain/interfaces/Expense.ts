import {CategoryType} from "./category";

export interface Expense {
    id: number;
    description: string;
    category?: CategoryType;
    date: Date,
    amount: number;
}