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
                  
                 }
        } */
      /* #swagger.responses[201] = {
            description: 'Book added',
            schema: {
            
                }
        } */
    },
  );
}
