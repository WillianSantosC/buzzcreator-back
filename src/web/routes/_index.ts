import { Router } from "express";
import * as BookRoutes from "./bookRoutes";
// ROUTE IMPORTS

export function initRoutes(app: Router) {
  BookRoutes.routes(app);
  // ROUTE EXPORTS
}
