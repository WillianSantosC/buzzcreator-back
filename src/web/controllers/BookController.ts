import { Request, Response } from "express";
import { BookUseCases } from "../../application/use-cases/books/BookUseCases";
import { BookService } from "../../infrastructure/services/BookService";

const bookUseCases = new BookUseCases(new BookService());

export class BookController {
  async create(req: Request, res: Response) {
    try {
      const book = await bookUseCases.create(req.body);
      res.status(201).json(book);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  async list(_: Request, res: Response) {
    try {
      const books = await bookUseCases.list();
      res.json(books);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const book = await bookUseCases.update(Number(id), req.body);
      res.json(book);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await bookUseCases.delete(Number(id));
      res.status(204).send();
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
