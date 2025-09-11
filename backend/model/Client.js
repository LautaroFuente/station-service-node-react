import pool from "../configuration/db.js";

const clients = {
  getAllClients: async () => {
    try {
      const [result] = await pool.query(
        "SELECT client_id, last_name, name, dni, age FROM clients c ORDER BY last_name;"
      );
      return result;
    } catch (err) {
      console.log(err);
      throw new Error("Error al realizar la consulta");
    }
  },

  getOneClient: async (dni) => {
    try {
      const query =
        "SELECT client_id, last_name, name, dni, age FROM clients c WHERE dni = ?;";
      const [result] = await pool.execute(query, [dni]);
      return result;
    } catch (err) {
      console.log(err);
      throw new Error("Error al realizar la consulta");
    }
  },

  addClient: async (client) => {
    try {
      const query =
        "INSERT INTO clients(client_id, name, last_name, dni, age) values (0, ?, ?, ?, ?);";
      const [result] = await pool.execute(query, [
        client.name,
        client.last_name,
        client.dni,
        client.age,
      ]);
      return result;
    } catch (err) {
      console.log(err);
      throw new Error("Error al agregar un cliente");
    }
  },
};

export default clients;
