import express from "express";
import {
  getAllPurchases,
  addPurchase,
  getAllPurchasesFromOneClient,
  getAllPurchasesFromOneEmployed,
  getAllPurchasesFromRange,
} from "../controllers/purchaseController.js";

const router = express.Router();

router.get("/", getAllPurchases);
router.get("/client/:dni", getAllPurchasesFromOneClient);
router.get("/employed/:dni", getAllPurchasesFromOneEmployed);
router.get("/:from/:to", getAllPurchasesFromRange);
router.post("/", addPurchase);

export default router;
