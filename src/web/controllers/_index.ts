import { AuthController } from "./AuthController";
import { BookController } from "./BookController";
import { OrderController } from "./OrderController";

export const bookController = new BookController();
export const orderController = new OrderController();
export const authController = new AuthController();
