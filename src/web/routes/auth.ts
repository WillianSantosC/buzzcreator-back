import { Router } from "express";
import { authController } from "../controllers/_index";
import wrapValidation from "../middlewares/validateRoutes";
import { authSchema } from "../schemas/authSchema";

export function routes(app: Router) {
  app.post(
    "/admin/login",
    wrapValidation(authController.login, authSchema.login),
    () => {
      // #swagger.tags = ["Auth"]
      /*  #swagger.parameters['authRecord'] = {
                in: 'body',
                description: 'Login admin.',
                schema: {
                        username: 'admin',
                        password: 'admin123'
                    }
        } */
      /* #swagger.responses[200] = {
            description: 'Admin logged in',
            schema: {
                    token: 'token'
                }
        } */
      /* #swagger.responses[401] = {
            description: 'Invalid credentials',
            schema: {
                    error: 'Credenciais inválidas'
                }
        } */
    },
  );
}
