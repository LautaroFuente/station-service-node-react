import { z } from "zod";

export const clientSchema = z.object({
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
  age: z
    .number()
    .int("La edad debe ser un numero entero")
    .positive("La edad debe ser un numero positivo")
    .min(1, "La edad debe ser al menos 1")
    .max(130, "La edad no puede ser mayor a 130"),
});

export const dniClientSchema = clientSchema.pick({
  dni: true,
});
