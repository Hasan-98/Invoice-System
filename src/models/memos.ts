import { DataTypes, Model, Sequelize } from "sequelize";
import { IMemosAttributes } from "../interfaces/memos.interface";

export default (sequelize: Sequelize) => {
  class Memo extends Model<IMemosAttributes> implements IMemosAttributes {
    id!: number;
    userId!: number;
    clientId!: number;
    project!: string;
    amountOfMoney!: string;
    salesTax!: string;
    createdAt!: Date;
    updatedAt!: Date;

    static associate(models: any) {
      Memo.belongsTo(models.User, {
        foreignKey: "userId",
        as: "memps",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      Memo.belongsTo(models.Client, {
        foreignKey: "clientId",
        as: "client",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  Memo.init(
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
      clientId: {
        type: DataTypes.INTEGER,
        field: "client_id",
        allowNull: true,
      },
      project: DataTypes.STRING,
      amountOfMoney: {
        type: DataTypes.STRING,
        field: "amount_of_money",
      },
      salesTax: {
        type: DataTypes.STRING,
        field: "sales_tax",
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
      modelName: "memo",
    }
  );
  return Memo;
};
