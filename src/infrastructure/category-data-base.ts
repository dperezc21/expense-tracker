import {CategoryRepository} from "../domain/repositories/category-repository";
import {Category} from "../domain/interfaces/category";
import {DataBaseCategory} from "./data-bases/data-base.json";
import {DataCategory} from "../domain/interfaces/data-category";

export class CategoryDataBase implements CategoryRepository {
    private dataBase = new DataBaseCategory();

    private newCategoryId = (categoryList: Category[]): number => {
        if(!categoryList?.length) return 1;
        return categoryList.reduce((a, b) => a.id > b.id ? a : b).id + 1;
    }

    deleteCategory(categoryId: number): Promise<boolean> {
        return Promise.resolve(false);
    }

    getAllCategories(): Promise<Category[]> {
        return new Promise(async(resolve, reject) => {
            const dataCategory: DataCategory = await this.dataBase.readExpenses();
            const categories = "categories" in dataCategory ? dataCategory.categories : [];
            resolve(categories);
        })
    }

    getCategoryById(categoryId: number): Promise<Category | null> {
        return Promise.resolve(null);
    }

    saveCategory(categoryName: string): Promise<boolean> {
        return new Promise(async(resolve, reject) => {
            const categories: Category[] = await this.getAllCategories();
            const newCategory: Category = {
                name: categoryName,
                id: this.newCategoryId(categories)
            }
            const dataCategories: DataCategory = {categories: [...categories, newCategory] };
            await this.dataBase.writeInFile(dataCategories);
        });
    }
}