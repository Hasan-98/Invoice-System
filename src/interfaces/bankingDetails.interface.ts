export interface IBankingDetailsAttributes {
    id?: number,
    userId: number,
    transferDestination: string,
    name: string,
    branchName : string,
    branchNumber: string,
    accountType: string,
    accountNumber: string,
    createdAt?: Date,
    updatedAt?: Date
  }