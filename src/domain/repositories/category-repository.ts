import {Category} from "../interfaces/category";

export interface CategoryRepository {
    saveCategory(categoryName: string): Promise<boolean>;
    getAllCategories(): Promise<Category[]>;
    deleteCategory(categoryId: number): Promise<boolean>;
    getCategoryById(categoryId: number): Promise<Category | null>;
    getCategoryByName(categoryName: string): Promise<Category>;
}