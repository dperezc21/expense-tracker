import {ID} from "./ID";

export interface Category extends ID {
    id: number;
    name: string;
}

export type CategoryType = Category | number;