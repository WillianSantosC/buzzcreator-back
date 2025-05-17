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

  update: z.object({
    id: z.string(),
    titulo: z.string().optional(),
    autor: z.string().optional(),
    descricao: z.string().optional(),
    preco: z.number().optional(),
    imagem: z.string().optional(),
    estoque: z.number().optional(),
  }),

  delete: z.object({
    id: z.string(),
  }),

  list: z.object({}),
};
