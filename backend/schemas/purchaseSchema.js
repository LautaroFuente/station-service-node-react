import { z } from "zod";

export const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
  message: "La fecha debe tener el formato YYYY-MM-DD",
});

export const purchaseSchema = z.object({
  client: z
    .number()
    .positive("El campo debe ser un numero entero positivo")
    .int("El campo debe ser un numero entero"),
  employed: z
    .number()
    .positive("El campo debe ser un numero entero positivo")
    .int("El campo debe ser un numero entero"),
  purchase_date: dateSchema,
  description: z
    .string()
    .max(255, "La descripción no puede tener mas de 255 caracteres"),
  total_amount: z
    .number()
    .positive("El monto total debe ser un numero positivo"),
});
