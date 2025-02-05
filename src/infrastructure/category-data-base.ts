import {CategoryRepository} from "../domain/repositories/category-repository";
import {Category} from "../domain/interfaces/category";
import {DataBaseCategory} from "./data-bases/data-base.json";

export class CategoryDataBase implements CategoryRepository {
    private dataBase = new DataBaseCategory();

    deleteCategory(categoryId: number): Promise<boolean> {
        return Promise.resolve(false);
    }

    getAllCategories(): Promise<Category[]> {
        return Promise.resolve([]);
    }

    getCategoryById(categoryId: number): Promise<Category | null> {
        return Promise.resolve(null);
    }

    saveCategory(categoryName: string): Promise<boolean> {
        return Promise.resolve(false);
    }
}