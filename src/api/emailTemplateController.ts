// need api to add email template by the user

import express, { RequestHandler } from "express";
import { models } from "../models/index";

export const addEmailTemplate: RequestHandler = async (
  req: any,
  res: any,
  next: any
) => {
  try {
    const { title, body } = req.body;
    let userID: any = req.user.id;

    const newEmailTemplate = {
      userId: userID,
      title,
      body,
    };

    const savedEmailTemplate = await models.EmailTemplate.create(
      newEmailTemplate
    );
    if (savedEmailTemplate) {
      res.status(201).json({ message: "Email template added successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// need api to get all email templates by the user
export const getEmailTemplates: RequestHandler = async (
  req: any,
  res: any,
  next: any
) => {
  try {
    let userID: any = req.user.id;
    const emailTemplates = await models.EmailTemplate.findAll({
      where: {
        userId: userID,
      },
    });
    res.status(200).json(emailTemplates);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export default {
  addEmailTemplate,
  getEmailTemplates,
};
