import { Request, Response } from "express";
import {ExpenseRepository} from "../domain/repositories/expense-repository";
import {ExpenseFileDataBase} from "../infrastructure/expense-file-data-base";
import {Expense} from "../domain/interfaces/Expense";

const expenseRepository: ExpenseRepository = new ExpenseFileDataBase();

export class ExpenseUseCases {

    async getAllExpenses(req: Request, res: Response) {
        try {
            const expensesList: Expense[] = await expenseRepository.getAllExpenses();
            res.json({message: "", result: expensesList});
        } catch (e: any) {
            console.error(e);
            res.status(500).json(e);
        }
    }
}