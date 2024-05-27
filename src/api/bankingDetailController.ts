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

export const updateBankingDetail: RequestHandler = async (
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
    let bankingDetailId = req.params.id;

    const existingBankingDetail = await models.BankingDetails.findOne({
      where: { id: bankingDetailId },
    });

    if (!existingBankingDetail) {
      return res.status(404).json({ message: "Banking detail not found" });
    }

    if (existingBankingDetail.userId !== userID) {
      return res
        .status(403)
        .json({
          message: "You are not authorized to update this banking detail",
        });
    }

    const newBankingDetail = {
      userId: userID,
      transferDestination,
      name,
      branchName,
      branchNumber,
      accountType,
      accountNumber,
    };

    const savedBankingDetail = await models.BankingDetails.update(
      newBankingDetail,
      { where: { id: bankingDetailId } }
    );
    if (savedBankingDetail) {
      res.status(200).json({ message: "Banking detail updated successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export default {
  addBankingDetail,
  getBankingDetails,
  updateBankingDetail,
};
