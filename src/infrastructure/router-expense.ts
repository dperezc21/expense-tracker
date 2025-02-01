import { Router } from "express";
import {ExpenseController} from "./controllers/expenseController";

const routerExpense: Router = Router();

const {getAllExpenses} = new ExpenseController();

routerExpense.get('/all', getAllExpenses);

export default routerExpense;