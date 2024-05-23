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
    const clients = await models.Client.findAll({
      where: {
        userId: userID,
      },
    });
    return res.status(200).json(clients);
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ error: "Cannot fetch clients at the moment" });
  }
};

export default {
  addClient,
  getClients,
};
