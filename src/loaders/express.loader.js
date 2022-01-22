import express, { Router } from "express";
import methodOverride from "method-override";
import morgan from "morgan";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { api, nodeEnv } from "../config";
import { logger, errorMiddleware, error404, errorHandler } from "../lib";

class ExpressLoader {
  app;

  constructor(controllers) {
    this.app = express();
    logger.info("Express Loader");
    this.initializeExpress();
    this.initializeErrorHandling();
    this.initializeControllers(controllers);
    this.initializeSwagger();
  }

  listen() {
    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      logger.log(`Example app listening at http://localhost:${port}`);
    });
  }

  initializeExpress() {
    this.app.use(methodOverride());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  initializeSwagger() {
    if (nodeEnv === "local") {
      const options = {
        swaggerDefinition: {
          info: {
            title: "REST API",
            version: "1.0.0",
            description: "Example docs",
          },
        },
        apis: ["swagger.yaml"],
      };

      const specs = swaggerJSDoc(options);
      // app.use(morgan('combined'));
      this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
    } else {
      this.app.use(morgan("combined"));
    }
  }

  initializeErrorHandling() {
    this.app.use(error404);
    this.app.use(errorMiddleware);
    this.app.use(errorHandler);
  }

  initializeControllers(controllers) {
    const router = Router();

    this.app.get("/status", (req, res) => {
      res.status(200).end();
    });

    this.app.head("/status", (req, res) => {
      res.status(200).end();
    });
    controllers.forEach((controller) => {
      router.use(controller.router);
    });
    this.app.use(api, router);
  }
}

export default ExpressLoader;
