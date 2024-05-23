import { DataTypes, Model, Sequelize } from "sequelize";
import { IEmailTemplateAttributes } from "../interfaces/emailTemplate.interface";

export default (sequelize: Sequelize) => {
  class EmailTemplate extends Model<IEmailTemplateAttributes> implements IEmailTemplateAttributes {
    id!: number;
    userId!: number;
    title!: string;
    body!: string;
    createdAt!: Date;
    updatedAt!: Date;

    static associate(models: any) {
        EmailTemplate.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'emailTemplates',
            onDelete: 'CASCADE', 
            onUpdate: 'CASCADE', 
          });
    }
  }

  EmailTemplate.init(
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
      title: DataTypes.STRING,
      body: DataTypes.TEXT,
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
      modelName: "email_template",
    }
  );
  return EmailTemplate;
};