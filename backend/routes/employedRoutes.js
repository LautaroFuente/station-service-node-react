import express from "express";
import {
  getAllEmployeds,
  getOneEmployed,
  addEmployed,
} from "../controllers/employedController.js";
import checkToken from "../middleware/checkToken.js";

const router = express.Router();

router.get("/", checkToken, getAllEmployeds);
router.get("/:dni", checkToken, getOneEmployed);
router.post("/", checkToken, addEmployed);

export default router;
