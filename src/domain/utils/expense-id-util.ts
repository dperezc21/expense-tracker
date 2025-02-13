import {ID} from "../interfaces/ID";

export class ExpenseIdUtil {
    static newExpenseId = (expenseList: ID[]): number => {
        if(!expenseList?.length) return 1;
        return expenseList.reduce((a, b) => a.id > b.id ? a : b).id + 1;
    }
}