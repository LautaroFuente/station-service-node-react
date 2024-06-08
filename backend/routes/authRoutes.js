import express from "express";
import { loginClient, loginEmployed } from "../controllers/authController.js";

const router = express.Router();

router.post("/login-client", loginClient);
router.post("/login-employed", loginEmployed);

export default router;
