import { Request, Response } from "express";

export class ExpenseController {

    getAllExpenses(req: Request, res: Response) {
        res.json({
            message: "hola"
        })
    }
}