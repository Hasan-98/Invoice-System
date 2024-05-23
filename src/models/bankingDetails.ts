import { DataTypes, Model, Sequelize } from "sequelize";
import { IBankingDetailsAttributes } from "../interfaces/bankingDetails.interface";

export default (sequelize: Sequelize) => {
  class BankingDetails extends Model<IBankingDetailsAttributes> implements IBankingDetailsAttributes {
    id!: number;
    userId!: number;
    transferDestination!: string;
    name!: string;
    branchName!: string;
    branchNumber!: string;
    accountType!: string;
    accountNumber!: string;
    createdAt!: Date;
    updatedAt!: Date;

    static associate(models: any) {
        BankingDetails.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'bankingDetails',
            onDelete: 'CASCADE', 
            onUpdate: 'CASCADE', 
          });
    }
  }

  BankingDetails.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        field: "user_id",
      },
      transferDestination:{
        type: DataTypes.STRING,
        field: "transfer_destination",
      },
      name: DataTypes.STRING,
      branchName: {
        type: DataTypes.STRING,
        field: "branch_name",
      },
      branchNumber: {
        type: DataTypes.STRING,
        field: "branch_number",
      },
      accountType: {
        type: DataTypes.STRING,
        field: "account_type",
      },
      accountNumber: {
        type: DataTypes.STRING,
        field: "account_number",
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
      },
    },
    {
      sequelize,
      modelName: "banking_details",
    }
  );
  return BankingDetails;
};