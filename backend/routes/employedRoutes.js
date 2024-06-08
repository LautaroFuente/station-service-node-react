import express from "express";
import {
  getAllEmployeds,
  getOneEmployed,
  addEmployed,
} from "../controllers/employedController.js";

const router = express.Router();

router.get("/", getAllEmployeds);
router.get("/:dni", getOneEmployed);
router.post("/", addEmployed);

export default router;
