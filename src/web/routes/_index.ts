import { Router } from "express";
import * as BookRoutes from "./bookRoutes";
import * as OrderRoutes from "./orderRoutes";
// ROUTE IMPORTS

export function initRoutes(app: Router) {
  BookRoutes.routes(app);
  OrderRoutes.routes(app);
  // ROUTE EXPORTS
}
