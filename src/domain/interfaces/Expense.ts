import {CategoryType} from "./category";
import {ID} from "./ID";

export interface Expense extends ID {
    description: string;
    category?: CategoryType;
    date: Date,
    amount: number;
}