import {Expense} from "../interfaces/Expense";

export class ExpenseModel implements Expense {
    date!: Date;
    description!: string;
    id!: number;
    amount!: number;
}