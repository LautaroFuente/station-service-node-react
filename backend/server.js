import app from "./app.js";
import dotenv from "dotenv";
import process from "process";

dotenv.config();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`La aplicación está funcionando en http://localhost:${port}`);
});
