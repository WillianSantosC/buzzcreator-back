import { Router } from "express";
import { bookController } from "../controllers/_index";
import wrapValidation from "../middlewares/validateRoutes";
import { bookSchema } from "../schemas/bookSchema";

export function routes(app: Router) {
  app.post(
    "/book",
    wrapValidation(bookController.create, bookSchema.create),
    () => {
      // #swagger.tags = ["Book"]
      /*  #swagger.parameters['bookRecord'] = {
                in: 'body',
                description: 'Add a new book.',
                schema: {
                        titulo: 'House of the Dragons',
                        autor: 'George R. R. Martin',
                        descricao: 'Dragoes',
                        preco: 60,
                        imagem: 'http://image.com',
                        estoque: 10
                    }
        } */
      /* #swagger.responses[201] = {
            description: 'Book added',
            schema: {
                    id: 1,
                    titulo: 'House of the Dragons',
                    autor: 'George R. R. Martin',
                    descricao: 'Dragoes',
                    preco: 60,
                    imagem: 'http://image.com',
                    estoque: 10
                }
        } */
    },
  );

  app.get("/book", bookController.list, () => {
    // #swagger.tags = ["Book"]
    /* #swagger.responses[200] = {
            description: 'List of books',
            schema: [
                    {
                        id: 1,
                        titulo: 'House of the Dragons',
                        autor: 'George R. R. Martin',
                        descricao: 'Dragoes',
                        preco: 60,
                        imagem: 'http://image.com',
                        estoque: 10
                    },
                    {
                        id: 2,
                        titulo: 'Elden Ring',
                        autor: 'Guilhermo Del Toro',
                        descricao: 'Fantasia',
                        preco: 60,
                        imagem: 'http://image.com',
                        estoque: 10
                    }
                ]
        } */
  });

  app.patch(
    "/book/:id",
    wrapValidation(bookController.update, bookSchema.update),
    () => {
      // #swagger.tags = ["Book"]
      //  #swagger.parameters['id'] = { description: 'Book ID' }
      /*  #swagger.parameters['bookRecord'] = {
                in: 'body',
                description: 'Update a book.',
                schema: {
                  estoque: 5
                 }
        } */
      /* #swagger.responses[200] = {
            description: 'Book updated',
            schema: {
                        id: 1,
                        titulo: 'House of the Dragons',
                        autor: 'George R. R. Martin',
                        descricao: 'Dragoes',
                        preco: 60,
                        imagem: 'http://image.com',
                        estoque: 10
                    }
        } */
    },
  );

  app.delete(
    "/book/:id",
    wrapValidation(bookController.delete, bookSchema.delete),
    () => {
      // #swagger.tags = ["Book"]
      //  #swagger.parameters['id'] = { description: 'Book ID' }
      /* #swagger.responses[204] = {
            description: 'Book deleted',
            schema: ''
        } */
    },
  );
}
