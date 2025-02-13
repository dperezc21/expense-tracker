import {Request, Response} from "express";
import {ExpenseRepository} from "../domain/repositories/expense-repository";
import {ExpenseFileDataBase} from "../infrastructure/data-base-impl/expense-file-data-base";
import {Expense} from "../domain/interfaces/Expense";
import {CategoryRepository} from "../domain/repositories/category-repository";
import {CategoryDataBase} from "../infrastructure/data-base-impl/category-data-base";
import {Category} from "../domain/interfaces/category";
import {ExpenseId} from "../domain/interfaces/ID";

const expenseRepository: ExpenseRepository = new ExpenseFileDataBase();
const categoryRepository: CategoryRepository = new CategoryDataBase();

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
        const { description, amount, category }: Expense = req.body as Expense;
        try {
            const findCategory: Category = await categoryRepository.getCategoryById(category as number) as Category;
            if(!findCategory?.id) {
                res.status(400).json({ message: "category not exists" });
                return ;
            }
            const expenseSaved: boolean = await expenseRepository.saveExpense(description, amount, findCategory);
            res.json({ message: expenseSaved ? "expensed saved" : "expense did not save" });
        } catch (e: any) {
            console.error(e);
            res.status(500).json(e.message);
        }
    }

    async updateExpense(req: Request, res: Response) {
        const expenseId: number = req.params.expenseId as unknown as ExpenseId;
        const { description, amount, category }: Expense = req.body as Expense;
        try {
            const getExpense = await expenseRepository.getExpenseById(expenseId);
            if(!getExpense?.id) {
                res.status(400).json({ message: "expense did not exists"});
                return ;
            }
            const categoryFound: Category = await categoryRepository.getCategoryById(category as number) as Category;
            if(!categoryFound?.id) {
                res.status(400).json({ message: "category not exists" });
                return ;
            }
            await expenseRepository.updateExpense(expenseId, description, amount, categoryFound);
            res.status(200).json({ message: "expensed updated" });
        } catch (e: any) {
            console.error(e);
            res.status(500).json(e.message);
        }
    }

    async deleteExpense(req: Request, res: Response) {
        const expenseId: number = req.params.expenseId as unknown as ExpenseId;
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

    async expenseSummary(req: Request, res: Response) {
        try {
            const summary: number = await expenseRepository.getSummaryExpense();
            res.status(200).json({
                summary
            })
        } catch (e: any) {
            console.error(e);
            res.status(500).json(e.message);
        }
    }
}