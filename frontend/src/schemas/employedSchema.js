import { z } from "zod";

export const employedSchema = z.object({
  name: z
    .string()
    .max(25, "El campo no puede tener mas de 25 caracteres")
    .regex(/^[a-zA-Z]+$/, "El campo solo puede contener letras"),
  last_name: z
    .string()
    .max(25, "El campo no puede tener mas de 25 caracteres")
    .regex(/^[a-zA-Z]+$/, "El campo solo puede contener letras"),
  dni: z
    .number()
    .positive("El DNI debe ser un numero positivo")
    .int("El DNI debe ser un numero entero"),
  employed_password: z
    .string()
    .max(255, "El campo no puede tener mas de 255 caracteres"),
});

export const dniEmployedSchema = employedSchema.pick({
  dni: true,
});

export const passwordEmployedSchema = employedSchema.pick({
  employed_password: true,
});

export const passwordAndDniEmployedSchema = employedSchema.pick({
  dni: true,
  employed_password: true,
});
