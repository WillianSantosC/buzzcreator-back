import { NextFunction, Request, Response } from "express";
import { Schema, ZodError } from "zod";

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const wrapValidation = (fn: Function, schema: Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (schema) {
      try {
        let data = {};

        const requestMembers = ["body", "params", "query"];

        for (const member of requestMembers) {
          data = { ...data, ...req[member] };
        }

        await schema.parseAsync(data);
        await fn(req, res, next);
        next();
      } catch (err: unknown) {
        if (err instanceof ZodError) {
          res.status(400).json({ error: "Invalid data", details: err.errors });
        } else {
          res.status(500).json({ error: "Internal Server Error" });
        }
      }
    } else {
      await fn(req, res, next);
    }
  };
};

export default wrapValidation;
