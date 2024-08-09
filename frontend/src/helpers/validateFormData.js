import { clientSchema, dniClientSchema } from "../schemas/clientSchema.js";
import {
  employedSchema,
  passwordAndDniEmployedSchema,
} from "../schemas/employedSchema.js";

export const validateNewClientData = (data) => {
  let { name, last_name, dni, age } = data;

  dni = Number(dni);
  age = Number(age);
  const result = clientSchema.safeParse({
    name,
    last_name,
    dni,
    age,
  });
  return result;
};

export const validateNewEmployedData = (data) => {
  let { name, last_name, dni, employed_password } = data;

  dni = Number(dni);
  const result = employedSchema.safeParse({
    name,
    last_name,
    dni,
    employed_password,
  });
  return result;
};

export const validateLoguinClientData = (data) => {
  let { dni } = data;
  dni = Number(dni);

  const result = dniClientSchema.safeParse({ dni });

  return result;
};

export const validateLoguinEmployedData = (data) => {
  let { dni, employed_password } = data;
  dni = Number(dni);

  const result = passwordAndDniEmployedSchema.safeParse({
    dni,
    employed_password,
  });

  return result;
};
