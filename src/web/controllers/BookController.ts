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
}
