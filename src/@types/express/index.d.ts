import { JwtPayload } from "../../web/middlewares/authGuard";

export {};

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
