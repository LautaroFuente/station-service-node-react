import pool from "../configuration/db.js";

const purchases = {
  getAllPurchases: async () => {
    try {
      const [result] = await pool.query(
        "SELECT purchase_date, description, total_amount  FROM purchases p ORDER BY purchase_date desc;"
      );
      return result;
    } catch (err) {
      console.log(err);
      throw new Error("Error al realizar la consulta");
    }
  },

  getAllPurchasesFromOneClient: async (dni) => {
    try {
      const query =
        "SELECT name, last_name, dni, purchase_date, description, total_amount FROM purchases p INNER JOIN clients c ON (c.client_id = p.client) WHERE c.dni = ? ORDER BY purchase_date desc;";
      const [result] = await pool.execute(query, [dni]);
      return result;
    } catch (err) {
      console.log(err);
      throw new Error("Error al realizar la consulta");
    }
  },

  getAllPurchasesFromOneEmployed: async (dni) => {
    try {
      const query =
        "SELECT name, last_name, dni, purchase_date, description, total_amount FROM purchases p INNER JOIN employeds e  ON (e.employed_id  = p.employed) WHERE e.dni = ? ORDER BY purchase_date desc;";
      const [result] = await pool.execute(query, [dni]);
      return result;
    } catch (err) {
      console.log(err);
      throw new Error("Error al realizar la consulta");
    }
  },

  getAllPurchasesFromRange: async (from, to) => {
    try {
      const query =
        "SELECT purchase_date, description, total_amount FROM purchases p WHERE p.purchase_date BETWEEN ? AND ?  ORDER BY purchase_date desc;";
      const [result] = await pool.execute(query, [from, to]);
      return result;
    } catch (err) {
      console.log(err);
      throw new Error("Error al realizar la consulta");
    }
  },

  addPurchase: async (
    client,
    employed,
    purchase_date,
    description,
    total_amount
  ) => {
    try {
      const query =
        "INSERT INTO purchases(purchase_id, client, employed, purchase_date, description, total_amount) values (0, ?, ?, ?, ?, ?);";
      const [result] = await pool.execute(query, [
        client,
        employed,
        purchase_date,
        description,
        total_amount,
      ]);
      return result;
    } catch (err) {
      console.log(err);
      throw new Error("Error al agregar una compra");
    }
  },
};

export default purchases;
