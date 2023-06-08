import express, { Request, Response } from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import { resolve } from "path";
import morgan from "morgan";
import morganBody from "morgan-body";
import cookieParser from "cookie-parser";
import AppError from "./appError";
import { RESOURCE_NOT_FOUND } from "../constants/response-codes";
import globalErrorHandler from "./error/error.controller";
import routes from "../endpoint/endpoint";

dotenv.config({ path: resolve(__dirname, "../.env") });

export const corsOptions = {
  origin: [
    'https://esunekiti.ng',
    'https://www.esunekiti.ng',
    'https://admin.esunekiti.ng',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://18.117.9.206:8083',
    'http://18.117.9.206:8084'
  ],
  credentials: true,
};

const createServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors(corsOptions)); //handle cors operations
  app.use(cookieParser() as express.RequestHandler);
  app.use(helmet({ crossOriginEmbedderPolicy: false }));
  app.use("/uploads", express.static("uploads"));

  routes(app);

  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  } else {
    morganBody(app);
  }

  app.all("*", (req: Request, res: Response, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, RESOURCE_NOT_FOUND));
  });

  app.use(globalErrorHandler);

  return app;
};

export default createServer;
