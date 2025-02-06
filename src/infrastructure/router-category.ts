import { Router } from "express";
import { CategoryUseCases } from "../application/category-use-cases";

const routerCategory: Router = Router();

const categoryUseCase = new CategoryUseCases();

routerCategory.post('/add', categoryUseCase.addCategory);

export default routerCategory;