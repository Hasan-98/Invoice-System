// need api to add memo by the user

import express, { RequestHandler } from "express";
import { models } from "../models/index";

export const addMemo: RequestHandler = async (
  req: any,
  res: any,
  next: any
) => {
  try {
    const { project, amountOfMoney, salesTax } = req.body;
    let userID: any = req.user.id;

    const newMemo = {
      userId: userID,
      project,
      amountOfMoney,
      salesTax,
    };

    const savedMemo = await models.Memos.create(newMemo);
    if (savedMemo) {
      res.status(201).json({ message: "Memo added successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// need api to get all memos by the user
export const getMemos: RequestHandler = async (
  req: any,
  res: any,
  next: any
) => {
  try {
    let userID: any = req.user.id;
    const memos = await models.Memos.findAll({
      where: {
        userId: userID,
      },
    });
    res.status(200).json(memos);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export default {
  addMemo,
  getMemos,
};
