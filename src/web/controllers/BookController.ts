import { NextFunction, Request, Response } from "express";
import { BookUseCases } from "../../application/use-cases/books/BookUseCases";
import { BookService } from "../../infrastructure/services/BookService";

const bookUseCases = new BookUseCases(new BookService());

export class BookController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const book = await bookUseCases.create(req.body);
      res.status(201).json(book);
    } catch (err) {
      next(err);
    }
  }

  async list(_: Request, res: Response, next: NextFunction) {
    try {
      const books = await bookUseCases.list();
      res.json(books);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const book = await bookUseCases.update(Number(id), req.body);
      res.json(book);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await bookUseCases.delete(Number(id));
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
