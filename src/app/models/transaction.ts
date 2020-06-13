export interface Transaction {
    id?: number
    name: string
    description?: string
    amount: number
    type: string;
    transactionDate: Date
}
