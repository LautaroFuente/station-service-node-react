import clients from "../model/Client.js";
import { clientSchema, dniClientSchema } from "../schemas/clientSchema.js";

export const getAllClients = async (req, res) => {
  try {
    let data = await clients.getAllClients();

    res.status(200).json(data);
  } catch (e) {
    console.log(e);
    throw new Error("Error al cargar los clientes");
  }
};

export const getOneClient = async (req, res) => {
  try {
    const { dni: dniReceived } = req.params;
    const dni = Number(dniReceived);
    const result = dniClientSchema.safeParse({ dni });

    if (result.success) {
      console.log("Validacion correcta");
      let data = await clients.getOneClient(dni);

      res.status(200).json(data);
    } else {
      console.error("Errores de validacion", result.error.errors);
      res.status(400).json({ errors: result.error.format() });
    }
  } catch (e) {
    console.log(e);
    throw new Error("Error al cargar el cliente");
  }
};

export const addClient = async (req, res) => {
  try {
    const { name, last_name, dni: dniReceived, age: ageReceived } = req.body;
    const dni = Number(dniReceived);
    const age = Number(ageReceived);
    const result = clientSchema.safeParse({ name, last_name, dni, age });

    if (result.success) {
      console.log("Validacion correcta");
      let clientExist = await clients.getOneClient(dni);
      if (clientExist) {
        res.status(409).json({ errors: "DNI ya registrado" });
      } else {
        let data = await clients.addClient({ name, last_name, dni, age });
        res.status(201).json(data);
      }
    } else {
      console.error("Errores de validacion", result.error.errors);
      res.status(400).json({ errors: result.error.format() });
    }
  } catch (e) {
    console.log(e);
  }
};
