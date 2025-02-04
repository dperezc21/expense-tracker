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
            res.status(500).json(e.message);
        }
    }

    async addExpense(req: Request, res: Response) {
        const { description, amount }: Expense = req.body as Expense;
        try {
            const expenseSaved: boolean = await expenseRepository.saveExpense(description, amount);
            res.json({ message: expenseSaved ? "expensed saved" : "expense did not save" });
        } catch (e: any) {
            console.error(e);
            res.status(500).json(e.message);
        }
    }

    async updateExpense(req: Request, res: Response) {
        const expenseId: number = req.params.expenseId as unknown as number;
        const { description, amount }: Expense = req.body as Expense;
        try {
            const getExpense = await expenseRepository.getExpenseById(expenseId);
            if(!getExpense?.id) {
                res.status(400).json({ message: "expense did not exists"});
                return ;
            }
            getExpense.amount = amount;
            getExpense.description = description;
            getExpense.date = new Date();
            await expenseRepository.updateExpense(getExpense);
            res.status(200).json({ message: "expensed updated" });
        } catch (e: any) {
            console.error(e);
            res.status(500).json(e.message);
        }
    }

    async deleteExpense(req: Request, res: Response) {
        const expenseId: number = req.params.expenseId as unknown as number;
        try {
            const getExpense = await expenseRepository.getExpenseById(expenseId);
            if(!getExpense?.id) {
                res.status(400).json({ message: "expense did not exists"});
                return ;
            }
            const deleteExpense: boolean = await expenseRepository.deleteExpense(expenseId);
            res.json({ message: deleteExpense ? "expensed deleted" : "expense did not delete" });
        } catch (e: any) {
            console.error(e);
            res.status(500).json(e.message);
        }
    }
}