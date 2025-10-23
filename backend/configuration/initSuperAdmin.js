import bcrypt from "bcrypt";
import pool from "./db.js";
import dotenv from "dotenv";

dotenv.config();

const MAX_RETRIES = 10;
const RETRY_DELAY = 2000; // 2 segundos

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function initSuperAdmin() {
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      const dni = process.env.SUPER_ADMIN_DNI;
      const name = process.env.SUPER_ADMIN_NAME;
      const lastName = process.env.SUPER_ADMIN_LAST_NAME;
      const passwordPlain = process.env.SUPER_ADMIN_PASSWORD;

      if (!dni || !name || !lastName || !passwordPlain) {
        console.warn("⚠️ Variables para Super Admin no definidas.");
        return;
      }

      const [existing] = await pool.query(
        "SELECT employed_id FROM employeds WHERE dni = ?",
        [dni]
      );

      if (existing.length > 0) {
        console.log("✅ Super Admin ya existe.");
        return;
      }

      const hashedPassword = await bcrypt.hash(passwordPlain, 10);

      await pool.query(
        `INSERT INTO employeds (name, last_name, dni, employed_password)
         VALUES (?, ?, ?, ?)`,
        [name, lastName, dni, hashedPassword]
      );

      console.log("🚀 Super Admin creado exitosamente");
      return;
    } catch (err) {
      retries++;
      console.log(
        `⏳ MySQL no lista aún... reintento ${retries}/${MAX_RETRIES}`
      );
      await wait(RETRY_DELAY);
    }
  }

  console.error("❌ No se pudo conectar a MySQL después de varios intentos");
}

export default initSuperAdmin;
