import { z } from "zod";

export const bookSchema = {
  create: z.object({
    titulo: z.string(),
    autor: z.string(),
    descricao: z.string(),
    preco: z.number(),
    imagem: z.string(),
    estoque: z.number(),
  }),

  update: z.object({}),

  retrieve: z.object({}),

  delete: z.object({}),
};
