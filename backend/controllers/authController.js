import clients from "../model/Client.js";
import employeds from "../model/Employed.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import {
  passwordEmployedSchema,
  dniEmployedSchema,
} from "../schemas/employedSchema.js";
import { dniClientSchema } from "../schemas/clientSchema.js";

dotenv.config();

async function checkPassword(CorrectPassword, inputPassword) {
  const match = await bcrypt.compare(inputPassword, CorrectPassword);
  return match;
}

export const loginClient = async (req, res) => {
  try {
    const { dni: dniReceived } = req.body;
    const dni = Number(dniReceived);
    const result = dniClientSchema.safeParse({ dni });
    if (result.success) {
      console.log("Validacion correcta");
      let data = await clients.getOneClient(dni);

      if (data.length > 0) {
        const token = jwt.sign({ dni }, process.env.JWT_KEY, {
          expiresIn: "30m",
        });
        console.log(data);
        res.status(200).json({ token });
      } else {
        res.status(200).json({ error: "Cliente no registrado" });
      }
    } else {
      console.error("Errores de validacion", result.error.errors);
      res.status(400).json({});
    }
  } catch (e) {
    console.log(e);
    throw new Error("Error al loguear al cliente");
  }
};

export const loginEmployed = async (req, res) => {
  try {
    const { dni: dniReceived, employed_password } = req.body;
    const dni = Number(dniReceived);

    const result1 = dniEmployedSchema.safeParse({ dni });
    const result2 = passwordEmployedSchema.safeParse({ employed_password });
    if (result1.success && result2.success) {
      console.log("Validacion correcta");
      let data = await employeds.getOneEmployedPass(dni);
      if (data.length === 0) {
        return res.status(200).json({});
      }
      const match = await checkPassword(
        data[0].employed_password,
        employed_password
      );

      if (match) {
        data = await employeds.getOneEmployed(dni);
        const token = jwt.sign({ dni }, process.env.JWT_KEY, {
          expiresIn: "30m",
        });
        res.status(200).json({ token });
      } else {
        res.status(200).json({});
      }
    } else {
      console.error("Errores de validacion");
      res.status(400).json({});
    }
  } catch (e) {
    console.log(e);
    throw new Error("Error al loguear al empleado");
  }
};
