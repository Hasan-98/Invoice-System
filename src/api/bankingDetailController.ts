// need api to add banking details

import express, { RequestHandler } from "express";
import { models } from "../models/index";

export const addBankingDetail: RequestHandler = async (
  req: any,
  res: any,
  next: any
) => {
  try {
    const {
      transferDestination,
      name,
      branchName,
      branchNumber,
      accountType,
      accountNumber,
    } = req.body;
    let userID: any = req.user.id;

    const newBankingDetail = {
      userId: userID,
      transferDestination,
      name,
      branchName,
      branchNumber,
      accountType,
      accountNumber,
    };

    const savedBankingDetail = await models.BankingDetails.create(
      newBankingDetail
    );
    if (savedBankingDetail) {
      res.status(201).json({ message: "Banking detail added successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// need api to get all banking details by the user
export const getBankingDetails: RequestHandler = async (
  req: any,
  res: any,
  next: any
) => {
  try {
    let userID: any = req.user.id;
    const bankingDetails = await models.BankingDetails.findAll({
      where: {
        userId: userID,
      },
    });
    res.status(200).json(bankingDetails);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export default {
  addBankingDetail,
  getBankingDetails,
};
