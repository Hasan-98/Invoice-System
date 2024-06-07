// router.ts

import express, { Router } from "express";
import multer from "multer";
const upload = multer();
import { register, login, userById } from "../api/UserController";

import {
  addClient,
  updateClient,
  getClients,
  getClientById,
  search,
} from "../api/clientController";
import {
  addCompany,
  getCompanies,
  updateCompany,
} from "../api/companyController";
import {
  addMemo,
  getMemos,
  updateMemo,
  getMemoById,
  deleteMemo,
  assignMemosToClient,
} from "../api/memosController";
import {
  addEmailTemplate,
  getEmailTemplates,
} from "../api/emailTemplateController";
import {
  addBankingDetail,
  getBankingDetails,
  updateBankingDetail,
} from "../api/bankingDetailController";
import passport from "../auth/passport";
const router: Router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get(
  "/user/:id",
  passport.authenticate("jwt", { session: false }),
  userById
);

router.post(
  "/add-client",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  addClient
);
router.get(
  "/get-client/:id",
  passport.authenticate("jwt", { session: false }),
  getClientById
);

router.put(
  "/update-client/:id",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updateClient
);
router.get(
  "/get-all-clients",
  passport.authenticate("jwt", { session: false }),
  getClients
);

router.get("/search", passport.authenticate("jwt", { session: false }), search);
router.post(
  "/add-memo",
  passport.authenticate("jwt", { session: false }),
  addMemo
);
router.get(
  "/get-memo/:id",
  passport.authenticate("jwt", { session: false }),
  getMemoById
);

router.delete(
  "/delete-memo/:id",
  passport.authenticate("jwt", { session: false }),
  deleteMemo
);
router.get(
  "/get-all-memos",
  passport.authenticate("jwt", { session: false }),
  getMemos
);

router.put(
  "/assign-memos-to-client/:id",
  passport.authenticate("jwt", { session: false }),
  assignMemosToClient
);
router.put(
  "/update-memo/:id",
  passport.authenticate("jwt", { session: false }),
  updateMemo
);
router.post(
  "/add-company",
  passport.authenticate("jwt", { session: false }),
  addCompany
);

router.get(
  "/get-all-companies",
  passport.authenticate("jwt", { session: false }),
  getCompanies
);

router.put(
  "/update-company/:id",
  passport.authenticate("jwt", { session: false }),
  updateCompany
);

router.post(
  "/add-banking-detail",
  passport.authenticate("jwt", { session: false }),
  addBankingDetail
);

router.get(
  "/get-all-banking-details",
  passport.authenticate("jwt", { session: false }),
  getBankingDetails
);

router.put(
  "/update-banking-detail/:id",
  passport.authenticate("jwt", { session: false }),
  updateBankingDetail
);
router.post(
  "/add-email-template",
  passport.authenticate("jwt", { session: false }),
  addEmailTemplate
);

router.get(
  "/get-all-email-templates",
  passport.authenticate("jwt", { session: false }),
  getEmailTemplates
);

export default router;
