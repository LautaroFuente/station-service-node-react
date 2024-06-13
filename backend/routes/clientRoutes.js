import express from "express";
import {
  getAllClients,
  getOneClient,
  addClient,
} from "../controllers/clientController.js";
import checkToken from "../middleware/checkToken.js";

const router = express.Router();

router.get("/", checkToken, getAllClients);
router.get("/:dni", checkToken, getOneClient);
router.post("/", addClient);

export default router;
