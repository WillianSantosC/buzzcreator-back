import { z } from "zod";

export const bookSchema = {
  create: z.object({
    titulo: z.string(),
    autor: z.string(),
    descricao: z.string(),
    preco: z.number().int().positive("O preco deve ser maior que zero"),
    imagem: z.string().url("A imagem deve ser uma URL"),
    estoque: z.number().int().positive("O estoque deve ser maior que zero"),
  }),

  update: z.object({
    id: z.string(),
    titulo: z.string().optional(),
    autor: z.string().optional(),
    descricao: z.string().optional(),
    preco: z
      .number()
      .int()
      .positive("O preco deve ser maior que zero")
      .optional(),
    imagem: z.string().url("A imagem deve ser uma URL").optional(),
    estoque: z
      .number()
      .int()
      .positive("O estoque deve ser maior que zero")
      .optional(),
  }),

  delete: z.object({
    id: z.string(),
  }),
};
