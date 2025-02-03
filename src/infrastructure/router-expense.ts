import { Router } from "express";
import {ExpenseUseCases} from "../application/expense-use-cases";

const routerExpense: Router = Router();

const {getAllExpenses, addExpense} = new ExpenseUseCases();

routerExpense.get('/all', getAllExpenses);
routerExpense.post('/add', addExpense);

export default routerExpense;