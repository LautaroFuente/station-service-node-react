import { clientSchema, dniClientSchema } from "../schemas/clientSchema.js";

export const validateNewClient = (data) => {
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

export const validateExistClient = (data) => {
  let { dni } = data;
  dni = Number(dni);

  const result = dniClientSchema.safeParse({ dni });

  return result;
};
