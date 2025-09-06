import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import path from "path";
import authRoutes from "./routes/authRoutes.js";
import purchaseRoutes from "./routes/purchaseRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import employedRoutes from "./routes/employedRoutes.js";

const __dirname = path.resolve();
const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

//app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/server/auth", authRoutes);
app.use("/server/purchases", purchaseRoutes);
app.use("/server/clients", clientRoutes);
app.use("/server/employeds", employedRoutes);

//app.get("*", (req, res) => {
//  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
//});

export default app;
