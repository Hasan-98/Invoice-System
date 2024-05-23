import express, { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import { models } from "../models/index";
import AWS from "aws-sdk";
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
export const register: RequestHandler = async (
  req: any,
  res: any,
  next: any
) => {
  try {
    const { name, email, password } = req.body;
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{5,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error:
          "Password must be at least 5 characters long and contain at least one special character",
      });
    }

    const alreadyExistsUser = await models.User.findOne({ where: { email } });
    if (alreadyExistsUser) {
      return res
        .status(409)
        .json({ message: "User with email already exists!" });
    }


    const newUser = {
      name,
      email,
      password,
    };

    const savedCustomer = await models.User.create(newUser);

    if (savedCustomer) {
      return res.status(200).json({ message: "Thanks for registering" });
    } else {
      return res
        .status(500)
        .json({ error: "Cannot register user at the moment!" });
    }
  } catch (err) {
    console.log("Error: ", err);
    return res
      .status(500)
      .json({ error: "Cannot register user at the moment!" });
  }
};

export const login: RequestHandler = async (req: any, res: any, next: any) => {
  try {
    const { email, password } = req.body;
    console.log("login callded");
    const userWithEmail = await models.User.findOne({ where: { email } }).catch(
      (err: Error) => {
        console.log("Error: ", err);
      }
    );
    if (!userWithEmail) {
      return res
        .status(400)
        .json({ message: "Email or password does not match!" });
    }
    if (userWithEmail.password !== password) {
      return res
        .status(400)
        .json({ message: "Email or password does not match!" });
    }
    const { id } = userWithEmail;
    const jwtToken = jwt.sign(
      { id: userWithEmail.id, email: userWithEmail.email },
      "secret"
    );

    res.status(200).json({
      message: "Welcome Back!",
      id,
      jwtToken,
    });
  } catch (err) {
    console.log("Error: ", err);
    return res
      .status(500)
      .json({ error: "Cannot Login user at the moment!" });
  }
};
export const userById: any = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const foundUser = await models.User.findOne({ where: { id } });

    if (!foundUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user: foundUser });
  } catch (err) {
    console.log("Error: ", err);
    res
      .status(500)
      .json({ error: "Unable to retrieve user profile at this time" });
  }
};

export default {
  register,
  login,
  userById,
};
