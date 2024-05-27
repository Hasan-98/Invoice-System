export interface IMemosAttributes {
    id?: number,
    userId: number,
    clientId: number | null,
    project: string,
    amountOfMoney: string,
    salesTax: string,
    createdAt?: Date,
    updatedAt?: Date
  }
