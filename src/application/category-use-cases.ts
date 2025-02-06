import {Request, Response} from "express";
import {CategoryDataBase} from "../infrastructure/category-data-base";
import {CategoryRepository} from "../domain/repositories/category-repository";
import {Category} from "../domain/interfaces/category";

const categoryRepository: CategoryRepository = new CategoryDataBase();


export class CategoryUseCases {
    async addCategory(req: Request, res: Response) {
        const {name: categoryName}: Category = req.body;
        try {
            const categoryExists: Category = await categoryRepository.getCategoryByName(categoryName);
            if(categoryExists) {
                res.status(400).json({message: "category exists"});
                return;
            }
            await categoryRepository.saveCategory(categoryName);
            res.status(200).json({ message: "category saved" });
        } catch (err: any) {
            res.status(500).send(err.message);
        }
    }
}