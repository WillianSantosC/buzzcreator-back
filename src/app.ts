import cookieParser from "cookie-parser";
import cors from "cors";
import { configDotenv } from "dotenv";
import express, {
  Application,
  NextFunction,
  Request,
  Response,
  Router,
} from "express";
import swaggerUi from "swagger-ui-express";

import swaggerFile from "./swagger.json";
import * as routes from "./web/routes/_index";

configDotenv();

const _logResponseTime = (req: Request, res: Response, next: NextFunction) => {
  const startHrTime = process.hrtime();

  res.on("finish", () => {
    const elapsedHrTime = process.hrtime(startHrTime);
    const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
    console.log("%s : %fms", req.path, elapsedTimeInMs);
  });

  next();
};

const _routeNotFoundError = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("ROUTE NOT FOUND: ", req.url);
  if (!req.route) res.status(404).json({ message: "Not Found: " + req.url });
  next();
};

class App {
  public app: Application;
  public router: Router;
  public _stats: unknown;

  constructor() {
    this.app = express();
    this.router = express.Router();

    this.setConfig();

    this.app.use(_logResponseTime);

    this.initRoutes(this.router);

    this.app.use("/", this.router);

    // 404
    this.app.use(_routeNotFoundError);
  }

  private setConfig() {
    //Enables cors
    this.app.use(
      cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
      }),
    );

    //Allows us to receive cookies
    this.app.use(cookieParser());

    //Allows us to receive requests with data in json format
    this.app.use(express.json({ limit: "50mb" }));

    //Allows us to receive requests with data in x-www-form-urlencoded format
    this.app.use(express.urlencoded({ limit: "50mb", extended: true }));

    // Swagger Config
    this.app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
  }

  private initRoutes(app: Router) {
    routes.initRoutes(app);
  }
}

export default new App().app;
