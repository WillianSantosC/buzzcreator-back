import { z } from "zod";

export const authSchema = {
  login: z.object({
    username: z.string(),
    password: z.string(),
  }),
};
