import { Router } from "express";
import { orderController } from "../controllers/_index";
import wrapValidation from "../middlewares/validateRoutes";
import { orderSchema } from "../schemas/orderSchema";

export function routes(app: Router) {
  app.post(
    "/order",
    wrapValidation(orderController.create, orderSchema.create),
    () => {
      // #swagger.tags = ["Order"]
      /*  #swagger.parameters['orderRecord'] = {
                in: 'body',
                description: 'Create a new order.',
                schema: {
                          cliente: 'João da Silva',
                          itens: [
                            {
                              bookId: 1,
                              quantity: 5
                            },
                            {
                              bookId: 2,
                              quantity: 1
                            }
                          ]
                      }
        } */
      /* #swagger.responses[201] = {
            description: 'Order created',
            schema: ''
        } */
    },
  );

  app.get("/order", orderController.list, () => {
    // #swagger.tags = ["Order"]
    /* #swagger.responses[200] = {
            description: 'List of orders',
            schema: [
                      {
                          id: 1,
                          total: 360,
                          data: '2025-05-17T21:26:44.363Z',
                          status: 'pendente',
                          cliente: 'João da Silva',
                          itens: [
                              {
                                  id: 1,
                                  orderId: 1,
                                  bookId: 2,
                                  quantity: 1,
                                  book: {
                                      id: 1,
                                      titulo: 'House of the Dragons',
                                      autor: 'George R. R. Martin',
                                      descricao: 'Dragoes',
                                      preco: 60,
                                      imagem: 'http://image.com',
                                      estoque: 9
                                  }
                              },
                              {
                                  id: 2,
                                  orderId: 1,
                                  bookId: 1,
                                  quantity: 5,
                                  book: {
                                      id: 2,
                                      titulo: 'Elden Ring',
                                      autor: 'Guilhermo Del Toro',
                                      descricao: 'Fantasia',
                                      preco: 60,
                                      imagem: 'http://image.com',
                                      estoque: 0
                                  }
                              }
                          ]
                      }
                    }
                ]
        } */
  });
}
