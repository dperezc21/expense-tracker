
export interface Expense {
    id: number;
    description: string;
    category?: string;
    date: Date,
    amount: number;
}