export interface Borrower {
    id?: number
    name: string
    description?: string
    amount: number
    balance: number
    paid: number
    date: string
    listOfReturns: LoanReturns[]
}

export interface LoanReturns{
    id?: number
    amount: number
    date: string
}