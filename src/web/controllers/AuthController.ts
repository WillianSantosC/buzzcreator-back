import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "chave_secreta";
export class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      if (username === "admin" && password === "admin123") {
        const token = jwt.sign({ role: "admin", username }, SECRET_KEY, {
          expiresIn: "1h",
        });

        return res.json({ token });
      }

      return res.status(401).json({ error: "Credenciais inválidas" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
