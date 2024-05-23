import { DataTypes, Model, Sequelize } from "sequelize";
import { ICompanyAttributes} from "../interfaces/company.interface";

export default (sequelize: Sequelize) => {
  class Company extends Model<ICompanyAttributes> implements ICompanyAttributes {
    id!: number;
    userId!: number;
    companyName!: string;
    address!: string;
    emailAddress!: string;
    createdAt!: Date;
    updatedAt!: Date;

    static associate(models: any) {
        Company.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
            onDelete: 'CASCADE', 
            onUpdate: 'CASCADE', 
        });
    }
  }

  Company.init(
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
      companyName: {
        type: DataTypes.STRING,
        field: "company_name",
      },
      address: DataTypes.STRING,
      emailAddress: {
        type: DataTypes.STRING,
        field: "email_address",
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
      modelName: "company",
    }
  );
  return Company;
};