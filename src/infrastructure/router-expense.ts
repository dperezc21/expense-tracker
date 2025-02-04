import { Router } from "express";
import {ExpenseUseCases} from "../application/expense-use-cases";

const routerExpense: Router = Router();

const {getAllExpenses, addExpense, updateExpense} = new ExpenseUseCases();

routerExpense.get('/all', getAllExpenses);
routerExpense.post('/add', addExpense);
routerExpense.put('/update/:expenseId', updateExpense);

export default routerExpense;