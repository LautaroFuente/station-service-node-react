import purchases from "../model/Purchase.js";
import { dniClientSchema } from "../schemas/clientSchema.js";
import { dniEmployedSchema } from "../schemas/employedSchema.js";
import { purchaseSchema, dateSchema } from "../schemas/purchaseSchema.js";

export const getAllPurchases = async (req, res) => {
  try {
    let data = await purchases.getAllPurchases();

    res.status(200).json(data);
  } catch (e) {
    console.log(e);
    throw new Error("Error al cargar las compras");
  }
};

export const getAllPurchasesFromOneClient = async (req, res) => {
  try {
    const { dni: dniReceived } = req.params;
    const dni = Number(dniReceived);
    const result = dniClientSchema.safeParse({ dni });

    if (result.success) {
      console.log("Validacion correcta");
      let data = await purchases.getAllPurchasesFromOneClient(dni);

      res.status(200).json(data);
    } else {
      console.error("Errores de validacion", result.error.errors);
      res.status(400).json({ errors: result.error.format() });
    }
  } catch (e) {
    console.log(e);
    throw new Error("Error al cargar las compras del cliente");
  }
};

export const getAllPurchasesFromOneEmployed = async (req, res) => {
  try {
    const { dni: dniReceived } = req.params;
    const dni = Number(dniReceived);
    const result = dniEmployedSchema.safeParse({ dni });
    if (result.success) {
      console.log("Validacion correcta");
      let data = await purchases.getAllPurchasesFromOneEmployed(dni);

      res.status(200).json(data);
    } else {
      console.error("Errores de validacion", result.error.errors);
      res.status(400).json({ errors: result.error.format() });
    }
  } catch (e) {
    console.log(e);
    throw new Error("Error al cargar las compras a cargo del empleado");
  }
};

export const getAllPurchasesFromRange = async (req, res) => {
  try {
    const { from, to } = req.params;

    const result1 = dateSchema.safeParse(from);
    const result2 = dateSchema.safeParse(to);
    if (result1.success && result2.success) {
      console.log("Validacion correcta");
      let data = await purchases.getAllPurchasesFromRange(from, to);

      res.status(200).json(data);
    } else {
      console.error("Errores de validacion");
      res.status(400).json({});
    }
  } catch (e) {
    console.log(e);
    throw new Error("Error al cargar las compras del rango especificado");
  }
};

export const addPurchase = async (req, res) => {
  try {
    const {
      client: clientReceived,
      employed: employedReceived,
      purchase_date,
      description,
      total_amount: totalReceived,
    } = req.body;
    const client = Number(clientReceived);
    const employed = Number(employedReceived);
    const total_amount = Number(totalReceived);
    const result = purchaseSchema.safeParse({
      client,
      employed,
      purchase_date,
      description,
      total_amount,
    });

    if (result.success) {
      console.log("Validacion correcta");
      let data = await purchases.addPurchase(
        client,
        employed,
        purchase_date,
        description,
        total_amount
      );

      res.status(201).json(data);
    } else {
      console.error("Errores de validacion", result.error.errors);
      res.status(400).json({ errors: result.error.format() });
    }
  } catch (e) {
    console.log(e);
    throw new Error("Error al crear la compra");
  }
};
