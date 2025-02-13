import {Category} from "../interfaces/category";
import {CategoryId} from "../interfaces/ID";

export interface CategoryRepository {
    saveCategory(categoryName: string): Promise<boolean>;
    getAllCategories(): Promise<Category[]>;
    deleteCategory(categoryId: CategoryId): Promise<boolean>;
    getCategoryById(categoryId: CategoryId): Promise<Category>;
    getCategoryByName(categoryName: string): Promise<Category>;
}