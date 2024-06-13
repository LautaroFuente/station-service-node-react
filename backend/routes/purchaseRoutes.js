import express from "express";
import {
  getAllPurchases,
  addPurchase,
  getAllPurchasesFromOneClient,
  getAllPurchasesFromOneEmployed,
  getAllPurchasesFromRange,
} from "../controllers/purchaseController.js";
import checkToken from "../middleware/checkToken.js";

const router = express.Router();

router.get("/", checkToken, getAllPurchases);
router.get("/client/:dni", checkToken, getAllPurchasesFromOneClient);
router.get("/employed/:dni", checkToken, getAllPurchasesFromOneEmployed);
router.get("/:from/:to", checkToken, getAllPurchasesFromRange);
router.post("/", checkToken, addPurchase);

export default router;
