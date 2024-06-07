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
      clientId: null,
    };

    const savedMemo = await models.Memo.create(newMemo);
    if (savedMemo) {
      res.status(201).json({ message: "Memo added successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMemos: RequestHandler = async (
  req: any,
  res: any,
  next: any
) => {
  try {
    let userID: any = req.user.id;
    const memos = await models.Memo.findAll({
      where: {
        userId: userID,
      },
    });
    res.status(200).json(memos);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const updateMemo: RequestHandler = async (
  req: any,
  res: any,
  next: any
) => {
  try {
    const { project, amountOfMoney, salesTax } = req.body;
    let userID: any = req.user.id;
    const memoId = req.params.id;

    const updatedMemo = {
      project,
      amountOfMoney,
      salesTax,
    };

    const memo = await models.Memo.findOne({
      where: {
        id: memoId,
        userId: userID,
      },
    });

    if (!memo) {
      return res.status(404).json({ message: "Memo not found" });
    }

    await models.Memo.update(updatedMemo, {
      where: {
        id: memoId,
        userId: userID,
      },
    });

    res.status(200).json({ message: "Memo updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export const deleteMemo: RequestHandler = async (
  req: any,
  res: any,
  next: any
) => {
  try {
    let userID: any = req.user.id;
    const memoId = req.params.id;

    const memo = await models.Memo.findOne({
      where: {
        id: memoId,
        userId: userID,
      },
    });

    if (!memo) {
      return res.status(404).json({ message: "Memo not found" });
    }

    await models.Memo.destroy({
      where: {
        id: memoId,
        userId: userID,
      },
    });

    res.status(200).json({ message: "Memo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMemoById: RequestHandler = async (
  req: any,
  res: any,
  next: any
) => {
  try {
    let userID: any = req.user.id;
    const memoId = req.params.id;

    const memo = await models.Memo.findOne({
      where: {
        id: memoId,
        userId: userID,
      },
    });

    if (!memo) {
      return res.status(404).json({ message: "Memo not found" });
    }

    res.status(200).json(memo);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
export const assignMemosToClient: RequestHandler = async (req, res, next) => {
  try {
    const { memoIds } = req.body; 
    const id: any = req.params.id;
    const clientExists = await models.Client.findOne({
      where: { id },
    });
    if (!clientExists) {
      return res.status(404).json({ error: "Client not found" });
    }

    if (!Array.isArray(memoIds)) {
      return res.status(400).json({ error: "Invalid memoIds format" });
    }

    for (const memoId of memoIds) {
      const memo = await models.Memo.findByPk(memoId);
      if (!memo) {
        return res.status(404).json({ error: `Memo with id ${memoId} not found` });
      }
      await memo.update({ clientId: id });
    }

    return res.status(200).json({ message: "Memos assigned successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Cannot assign memos at the moment" });
  }
};
export default {
  addMemo,
  getMemos,
  updateMemo,
  deleteMemo,
  getMemoById,
  assignMemosToClient,
};
