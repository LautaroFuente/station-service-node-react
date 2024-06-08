import employeds from "../model/Employed.js";
import {
  employedSchema,
  dniEmployedSchema,
} from "../schemas/employedSchema.js";

export const getAllEmployeds = async (req, res) => {
  try {
    let data = await employeds.getAllEmployeds();

    res.status(200).json(data);
  } catch (e) {
    console.log(e);
    throw new Error("Error al cargar los empleados");
  }
};

export const getOneEmployed = async (req, res) => {
  try {
    const { dni: dniReceived } = req.params;
    const dni = Number(dniReceived);

    const result = dniEmployedSchema.safeParse({ dni });
    if (result.success) {
      console.log("Validacion correcta");
      let data = await employeds.getOneEmployed(dni);

      res.status(200).json(data);
    } else {
      console.error("Errores de validacion", result.error.errors);
      res.status(400).json({ errors: result.error.format() });
    }
  } catch (e) {
    console.log(e);
    throw new Error("Error al cargar el empleado");
  }
};

export const addEmployed = async (req, res) => {
  try {
    const { name, last_name, dni: dniReceived, employed_password } = req.body;
    const dni = Number(dniReceived);
    const result = employedSchema.safeParse({
      name,
      last_name,
      dni,
      employed_password,
    });
    if (result.success) {
      console.log("Validacion correcta");
      let data = await employeds.addEmployed({
        name,
        last_name,
        dni,
        employed_password,
      });

      res.status(201).json(data);
    } else {
      console.error("Errores de validacion", result.error.errors);
      res.status(400).json({ errors: result.error.format() });
    }
  } catch (e) {
    console.log(e);
    throw new Error("Error al crear el empleado");
  }
};
