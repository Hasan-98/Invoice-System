export interface IClientAttributes {
    id?: number,
    userId: number,
    clientName: string,
    companyName: string,
    personInCharge : string,
    address: string,
    emailAddress: string,
    notes: string,
    uploadImage: string,
    createdAt?: Date,
    updatedAt?: Date
  }