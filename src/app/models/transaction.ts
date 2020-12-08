import { Account } from './accounts';

export interface Transaction {
    id?: number
    name: string
    description?: string
    amount: number
    type: string;
    transactionDate: string
    account: Account
}
