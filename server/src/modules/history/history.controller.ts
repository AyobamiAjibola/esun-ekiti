import { NextFunction, Request, Response } from "express";
import { BAD_REQUEST, OK, RESOURCE_CREATED } from "../../constants/response-codes";
import AppError from "../../utils/appError";
import * as historyValidator from "./history.validators";
import * as historyServices from "./history.services";

//= =================== CREATE HISTORY ==================//
const history = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validate = historyValidator.postHistory(req.body);
    if (validate.error) {
      return next(new AppError(validate.error.message, BAD_REQUEST));
    }

    const newHistory = await historyServices.history(req.body, next, req);

    newHistory &&
      res.status(RESOURCE_CREATED).json({
        status: "success",
        message: "Created successfully",
        data: { newHistory },
      });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

//= =================== UPDATE HISTORY ==================//
const upd_history = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validate = historyValidator.updHistory(req.body);
    if (validate.error) {
      return next(new AppError(validate.error.message, BAD_REQUEST));
    }

    await historyServices.updHistory(req.body, next, req);

    return res.status(OK).json({
      status: "success",
      message: "Updated successfully",
      data: null,
    });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

const upd_history_img = async (req: Request, res: Response, next: NextFunction) => {
  try {

    await historyServices.updHistoryImg(req.body, next, req);

    return res.status(OK).json({
      status: "success",
      message: "Updated successfully",
      data: null,
    });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

//= =================== FETCH HISTORY ==================//
const fetch_history = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await historyServices.fetchHistory(next, req);
    const info = result?.result
    const info2 = result?.fetch
    console.log(info2, 'history')
    return res.status(OK).json({
      status: "success",
      message: "Fetch successful",
      data: { info, info2 },
    });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

//= =================== FETCH HISTORY BY ID ==================//
const single_history = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const singleHistory = await historyServices.readSingleHistory(next, req);
    return res.status(OK).json({
      status: "success",
      message: "Fetch successful",
      data: { singleHistory },
    });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

//= =================== DELETE HISTORY BY ID ==================//
const delete_history = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const del = await historyServices.delHistory(next, req);
    del &&
      res.status(OK).json({
        status: "success",
        message: "History successfully deleted",
        data: null,
      });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

const delete_history_image = async (req: Request, res: Response, next: NextFunction) => {
  try {

    await historyServices.delete_single_image(req);

      res.status(OK).json({
        status: "success",
        message: "History successfully deleted",
        data: null,
      });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

export default {
  history,
  upd_history,
  fetch_history,
  single_history,
  delete_history,
  upd_history_img,
  delete_history_image
};
