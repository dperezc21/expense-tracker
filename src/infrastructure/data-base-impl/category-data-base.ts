import {CategoryRepository} from "../../domain/repositories/category-repository";
import {Category} from "../../domain/interfaces/category";
import {DataBaseCategory} from "../data-bases/data-base.json";
import {DataCategory} from "../../domain/interfaces/data-category";
import {ExpenseId} from "../../domain/utils/expense-Id";

export class CategoryDataBase implements CategoryRepository {
    private dataBase = new DataBaseCategory();

    deleteCategory(categoryId: number): Promise<boolean> {
        return new Promise(async(resolve, reject) => {
            const categories: Category[] = await this.getAllCategories();
            if(categories.every(value => value.id !== categoryId)) resolve(false);
            const categoriesFiltered: Category[] = categories.filter(value => value.id !== categoryId);
            await this.dataBase.writeInFile({ categories: categoriesFiltered });
            resolve(true);
        })
    }

    getAllCategories(): Promise<Category[]> {
        return new Promise(async(resolve, reject) => {
            const dataCategory: DataCategory = await this.dataBase.readExpenses();
            const categories = "categories" in dataCategory ? dataCategory.categories : [];
            resolve(categories);
        })
    }

    getCategoryById(categoryId: number): Promise<Category> {
        return new Promise(async(resolve, reject) => {
            const categories: Category[] = await this.getAllCategories();
            const category: Category = categories.find(value => value.id === categoryId) as Category;
            resolve(category);
        })
    }

    saveCategory(categoryName: string): Promise<boolean> {
        return new Promise(async(resolve, reject) => {
            const categories: Category[] = await this.getAllCategories();
            const newCategory: Category = {
                name: categoryName,
                id: ExpenseId.newExpenseId(categories)
            }
            const dataCategories: DataCategory = {categories: [...categories, newCategory] };
            await this.dataBase.writeInFile(dataCategories);
            resolve(true);
        });
    }

    getCategoryByName(categoryName: string): Promise<Category> {
        return new Promise(async(resolve, reject) => {
            const categories: Category[] = await this.getAllCategories();
            const category: Category = categories.find(value => value.name === categoryName) as Category;
            resolve(category);
        })
    }
}