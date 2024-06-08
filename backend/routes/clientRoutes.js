import express from "express";
import {
  getAllClients,
  getOneClient,
  addClient,
} from "../controllers/clientController.js";

const router = express.Router();

router.get("/", getAllClients);
router.get("/:dni", getOneClient);
router.post("/", addClient);

export default router;
