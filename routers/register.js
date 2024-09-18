import express from "express";
import crypto from "crypto";
import { users } from "../storage.js";
import { USER_ID_HEADER } from "../constants.js";

const router = express.Router();

router.post("/", (req, res) => {
  const { password, name, email } = req.body;
  const id = crypto.randomUUID();
  users.push({ id, name, email, password });
  res.setHeader(USER_ID_HEADER, id);
  res.status(200).json({ id, name, email });
});

export default router;
