import { Request, Response } from "express";
import { OrderUseCases } from "../../application/use-cases/orders/OrderUseCases";
import { BookService } from "../../infrastructure/services/BookService";
import { OrderService } from "../../infrastructure/services/OrderService";

const orderUseCases = new OrderUseCases(new OrderService(), new BookService());

export class OrderController {
  async create(req: Request, res: Response) {
    try {
      const order = await orderUseCases.create(req.body);
      res.status(201).json(order);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  async list(_: Request, res: Response) {
    try {
      const orders = await orderUseCases.list();
      res.json(orders);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      await orderUseCases.updateStatus(Number(req.params.id), req.body.status);
      res.status(200).json({ message: "Order updated" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
