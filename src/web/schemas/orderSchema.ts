import { z } from "zod";

export const orderSchema = {
  create: z.object({
    cliente: z.string().min(1, "Nome do cliente é obrigatório"),
    itens: z
      .array(
        z.object({
          bookId: z.number().min(1, "ID do livro é obrigatório"),
          quantidade: z
            .number()
            .int()
            .positive("A quantidade deve ser maior que zero"),
        }),
      )
      .min(1, "O pedido deve conter ao menos um item"),
  }),

  update: z.object({
    id: z.string(),
    status: z.enum(["pago", "cancelado"]),
  }),
};
