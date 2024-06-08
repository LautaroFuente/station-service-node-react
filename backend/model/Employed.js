import { connection } from "../configuration/db.js";
import bcrypt from "bcrypt";

const employeds = {
  getAllEmployeds: async () => {
    try {
      const [result] = await connection.query(
        "SELECT employed_id, last_name, name, dni FROM employeds e ORDER BY last_name;"
      );
      return result;
    } catch (err) {
      console.log(err);
      throw new Error("Error al realizar la consulta");
    }
  },

  getOneEmployed: async (dni) => {
    try {
      const query =
        "SELECT employed_id, last_name, name, dni FROM employeds e WHERE dni = ?;";
      const [result] = await connection.execute(query, [dni]);
      return result;
    } catch {
      console.log(err);
      throw new Error("Error al realizar la consulta");
    }
  },

  getOneEmployedPass: async (dni) => {
    try {
      const query = "SELECT employed_password FROM employeds e WHERE dni = ?;";
      const [result] = await connection.execute(query, [dni]);
      return result;
    } catch {
      console.log(err);
      throw new Error("Error al realizar la consulta");
    }
  },

  addEmployed: async (employed) => {
    try {
      async function hashPassword(password) {
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
      }

      const query =
        "INSERT INTO employeds(employed_id, name, last_name, dni, employed_password) values (0, ?, ?, ?, ?);";
      const [result] = await connection.execute(query, [
        employed.name,
        employed.last_name,
        employed.dni,
        await hashPassword(employed.employed_password).then((hashed) => {
          return hashed;
        }),
      ]);
      return result;
    } catch (err) {
      console.log(err);
      throw new Error("Error al agregar un cliente");
    }
  },

  authEmployed: async (employed) => {
    try {
      const query =
        "INSERT INTO employeds(employed_id, name, last_name, dni) values (0, ?, ?, ?);";
      const [result] = await connection.execute(query, [
        employed.name,
        employed.last_name,
        employed.dni,
      ]);
      if (result) return true;
      return false;
    } catch (err) {
      console.log(err);
      throw new Error("Error al agregar un cliente");
    }
  },
};

export default employeds;
