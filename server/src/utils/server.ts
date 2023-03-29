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
    'http://localhost:3001',
    'http://localhost:3000',
    'https://esun-ekiti-portal.onrender.com'
  ],
  credentials: true,
};

const createServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cookieParser() as express.RequestHandler);
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', 'https://esun-ekiti-portal.onrender.com');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
  });
  app.use(cors(corsOptions)); //handle cors operations
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
