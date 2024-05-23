import { DataTypes, Model, Sequelize } from "sequelize";
import { IClientAttributes } from "../interfaces/client.interface";

export default (sequelize: Sequelize) => {
  class Client extends Model<IClientAttributes> implements IClientAttributes {
    id!: number;
    userId!: number;
    clientName!: string;
    companyName!: string;
    personInCharge!: string;
    address!: string;
    emailAddress!: string;
    notes!: string;
    uploadImage!: string;
    createdAt!: Date;
    updatedAt!: Date;

    static associate(models: any) {
        Client.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
            onDelete: 'CASCADE', 
            onUpdate: 'CASCADE', 
          });
    }
  }

  Client.init(
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
      clientName: {
        type: DataTypes.STRING,
        field: "client_name",
      },
      companyName: {
        type: DataTypes.STRING,
        field: "company_name",
      },
      personInCharge: {
        type: DataTypes.STRING,
        field: "person_in_charge",
      },
      address: DataTypes.STRING,
      emailAddress: {
        type: DataTypes.STRING,
        field: "email_address",
      },
      notes: DataTypes.STRING,
      uploadImage: {
        type: DataTypes.STRING,
        field: "upload_image",
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
      modelName: "client",
    }
  );
  return Client;
};
