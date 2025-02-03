import { Router } from "express";
import {ExpenseUseCases} from "../application/expense-use-cases";

const routerExpense: Router = Router();

const {getAllExpenses} = new ExpenseUseCases();

routerExpense.get('/all', getAllExpenses);

export default routerExpense;