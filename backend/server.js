import app from "./app.js";
import dotenv from "dotenv";
import process from "process";
import initSuperAdmin from "./configuration/initSuperAdmin.js";

dotenv.config();

const port = process.env.PORT || 3000;

initSuperAdmin().finally(() => {
  app.listen(port, () => {
    console.log(`La aplicación está funcionado en http://localhost:${port}`);
  });
});
