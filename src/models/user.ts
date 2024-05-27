import { DataTypes, Model, Sequelize } from "sequelize";
import { IUserAttributes } from "../interfaces/user.interface";
export default (sequelize: Sequelize) => {
  class User extends Model<IUserAttributes> implements IUserAttributes {
    id!: number;
    name!: string;
    email!: string;
    password!: string;

    static associate(models: any) {
      User.hasMany(models.Client, {
        foreignKey: "userId",
        as: "clients",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      User.hasMany(models.EmailTemplate, {
        foreignKey: "userId",
        as: "emailTemplates",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      User.hasMany(models.BankingDetails, {
        foreignKey: "userId",
        as: "bankingDetails",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      User.hasOne(models.Company, {
        foreignKey: "userId",
        as: "company",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      User.hasMany(models.Memo, {
        foreignKey: "userId",
        as: "memos",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
    }
  );

  return User;
};
