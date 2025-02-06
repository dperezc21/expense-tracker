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

    async getAllCategories(req: Request, res: Response) {
        try {
            const allCategories: Category[] = await categoryRepository.getAllCategories();
            res.status(200).json({ categories: allCategories });
        } catch (err: any) {
            res.status(500).send(err.message);
        }
    }

    async deleteCategory(req: Request, res: Response) {
        const categoryId: number = req.params.categoryId as unknown as number;
        try {
            const category: Category = await categoryRepository.getCategoryById(categoryId) as Category;
            if(!category?.id) {
                res.status(400).json({ message: "category not exists" });
            }
            const categoryDeleted: boolean = await categoryRepository.deleteCategory(category.id);
            res.status(200).json({ message: `category ${categoryDeleted ? 'deleted': 'did not delete' }` });
        } catch (err: any) {
            res.status(500).send(err.message);
        }
    }
}