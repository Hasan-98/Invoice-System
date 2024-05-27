// need api to add client
import { models } from "../models/index";
import express, { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import AWS from "aws-sdk";

// Initialize AWS S3 with your credentials
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export const addClient: RequestHandler = async (
  req: any,
  res: any,
  next: any
) => {
  try {
    const {
      clientName,
      companyName,
      personInCharge,
      address,
      emailAddress,
      notes,
    } = req.body;
    let memoIds = req.body.memoIds;
    let userID: any = req.user.id;
    const userFolder = `client-${emailAddress}`;
    const file = req.file;
    const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

    if (!BUCKET_NAME) {
      throw new Error("AWS_BUCKET_NAME is not defined");
    }

    const type = file.mimetype?.split("/")[1];
    const name = `${userFolder}/${Date.now()}.${type}`;
    const params = {
      Bucket: BUCKET_NAME,
      Key: name,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const { Location } = await s3.upload(params).promise();

    const newClient = {
      userId: userID,
      clientName,
      companyName,
      personInCharge,
      address,
      emailAddress,
      notes,
      uploadImage: Location,
    };

    const savedClient = await models.Client.create(newClient);

    if (memoIds) {
      memoIds = JSON.parse(memoIds);
      if (Array.isArray(memoIds)) {
        for (const memoId of memoIds) {
          const memo = await models.Memo.findByPk(memoId);
          if (memo) {
            await memo.update({ clientId: savedClient.id });
          } else {
            return res.status(400).json({ error: `Memo with id ${memoId} not found` });
          }
        }
      }
    }

    if (savedClient) {
      return res.status(200).json({ message: "Client added successfully" });
    } else {
      return res
        .status(500)
        .json({ error: "Cannot add client at the moment!" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Cannot Add client at the moment" });
  }
};


export const getClients: RequestHandler = async (
  req: any,
  res: any,
  next: any
) => {
  try {
    const userID: any = req.user.id;
    const { clientName, memo } = req.query;

    const whereClause: { [key: string]: any } = {
      userId: userID,
    };

    if (clientName) {
      whereClause["clientName"] = { [Op.like]: `%${clientName}%` };
    }

    const clients = await models.Client.findAll({
      where: whereClause,
      include: [
        {
          model: models.Memo,
          as: "memos",
          where: memo ? { project: { [Op.like]: `%${memo}%` } } : undefined,
          required: false,
        },
      ],
    });

    return res.status(200).json(clients);
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ error: "Cannot fetch clients at the moment" });
  }
};

export const search: RequestHandler = async (req: any, res: any, next: any) => {
  try {
    const userID: any = req.user.id;
    const { searchType, clientName, memo } = req.query;

    if (searchType === "client") {
      const whereClause: { [key: string]: any } = {
        userId: userID,
      };

      if (clientName) {
        whereClause["name"] = clientName;
      }

      const clients = await models.Client.findAll({
        where: whereClause,
        include: [
          {
            model: models.Memo,
            as: "memos",
            where: memo ? { memo: memo } : undefined,
            required: false,
          },
        ],
      });

      return res.status(200).json(clients);
    } else if (searchType === "memo") {
      const memos = await models.Memo.findAll({
        where: {
          userId: userID,
          project: memo ? memo : undefined,
        },
        attributes: ["project"],
      });

      return res.status(200).json(memos);
    } else {
      return res.status(400).json({ error: "Invalid search type" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ error: "Cannot perform search at the moment" });
  }
};
export default {
  addClient,
  getClients,
  search,
};
