import express, { RequestHandler } from "express";
import { models } from "../models/index";

export const addCompany: RequestHandler = async (
  req: any,
  res: any,
  next: any
) => {
  try {
    const { companyName, address, emailAddress } = req.body;
    let userID: any = req.user.id;

    const newCompany = {
      userId: userID,
      companyName,
      address,
      emailAddress,
    };

    const savedCompany = await models.Company.create(newCompany);
    if (savedCompany) {
      res.status(201).json({ message: "Company added successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCompanies: RequestHandler = async (
  req: any,
  res: any,
  next: any
) => {
  try {
    let userID: any = req.user.id;
    const companies = await models.Company.findAll({
      where: {
        userId: userID,
      },
    });
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export default {
  addCompany,
  getCompanies,
};
