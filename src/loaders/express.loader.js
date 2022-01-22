import cors from "cors";
import express from "express";
import methodOverride from "method-override";
import morgan from "morgan";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { api, nodeEnv } from "../config";
import controllers from "../controllers";
import { logger, errorMiddleware, error404, errorHandler } from "../lib";
import models from "../models";
import routes from "../routes";
import services from "../services";

export default async ({ app }) => {
  logger.info("Express loader!");

  app.get("/status", (req, res) => {
    res.status(200).end();
  });

  app.head("/status", (req, res) => {
    res.status(200).end();
  });

  app.use(methodOverride());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.enable("trust proxy");
  app.use(cors());

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
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  } else {
    app.use(morgan("combined"));
  }

  logger.info(`router: ${api.prefix}`);

  const service = services(models);
  const controller = controllers(service);
  app.use(api.prefix, routes({ controller }));

  // Error Handling
  app.use(error404);
  app.use(errorMiddleware);
  app.use(errorHandler);
};
