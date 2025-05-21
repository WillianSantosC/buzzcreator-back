import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "chave_secreta";

export interface JwtPayload {
  username?: string;
  role?: string;
  [key: string]: unknown;
}

export function authGuard(allowedRoles?: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const cookieToken = req.cookies?.session;

    // Tenta pegar do header Authorization ou do cookie "session"
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : cookieToken;

    if (!token) {
      return res
        .status(401)
        .json({ error: "Token não fornecido ou mal formatado" });
    }

    try {
      const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
      req.user = decoded;

      if (allowedRoles && !allowedRoles.includes(decoded.role ?? "")) {
        return res
          .status(403)
          .json({ error: "Acesso negado: permissões insuficientes" });
      }

      next();
    } catch {
      return res.status(401).json({ error: "Token inválido ou expirado" });
    }
  };
}
