import { Router } from "express";
import {ExpenseUseCases} from "../application/expense-use-cases";

const routerExpense: Router = Router();

const {getAllExpenses, addExpense, updateExpense, deleteExpense} = new ExpenseUseCases();

routerExpense.get('/all', getAllExpenses);
routerExpense.post('/add', addExpense);
routerExpense.put('/update/:expenseId', updateExpense);
routerExpense.delete('/delete/:expenseId', deleteExpense);

export default routerExpense;