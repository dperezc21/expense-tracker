import {Expense} from "../interfaces/Expense";


export class ExpenseModel implements Expense {
    category!: string;
    date!: Date;
    description!: string;
    id!: number;
    amount!: number;
}