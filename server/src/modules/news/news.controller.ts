import { NextFunction, Request, Response } from "express";
import { BAD_REQUEST, OK, RESOURCE_CREATED } from "../../constants/response-codes";
import AppError from "../../utils/appError";
import * as newsValidator from "./news.validators";
import * as newsServices from "./news.services";

//= =================== NEW NEWS ==================//
const new_news = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validate = newsValidator.postNews(req.body);
    if (validate.error) {
      return next(new AppError(validate.error.message, BAD_REQUEST));
    }

    const news = await newsServices.newNews(req.body, next, req);

    news &&
      res.status(RESOURCE_CREATED).json({
        status: "success",
        message: "News created successfully",
        data: { news },
      });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

//= =================== UPDATE NEWS ==================//
const upd_news = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validate = newsValidator.updNews(req.body);
    if (validate.error) {
      return next(new AppError(validate.error.message, BAD_REQUEST));
    }

    await newsServices.updNews(req.body, next, req);

    return res.status(OK).json({
      status: "success",
      message: "News updated successfully",
      data: null,
    });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

const upd_news_img = async (req: Request, res: Response, next: NextFunction) => {
  try {

    await newsServices.updNewsImg(req.body, next, req);

    return res.status(OK).json({
      status: "success",
      message: "Updated successfully",
      data: null,
    });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};
//= =================== FETCH SINGLE NEWS ==================//
const single_news = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const singleNews = await newsServices.readSingleNews(next, req);
    return res.status(OK).json({
      status: "success",
      message: "Fetch successful",
      data: { singleNews },
    });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

//= =================== FETCH NEWS ==================//
const fetch_news_active = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await newsServices.fetchNewsActive(next, req);
    const res1 = result?.result;
    const res2 = result?.array;
    return res.status(OK).json({
      status: "success",
      message: "Fetch successful",
      data: { res1, res2 }
    });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

const fetch_news_limit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await newsServices.fetchNewsLimit(next, req);
    return res.status(OK).json({
      status: "success",
      message: "Fetch successful",
      data: { result },
    });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

const fetch_news_all = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await newsServices.fetchNewsAll(next, req);
    const res1 = result?.result;
    const res2 = result?.array
    return res.status(OK).json({
      status: "success",
      message: "Fetch successful",
      data: { res1, res2 },
    });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

const delete_news = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await newsServices.delNews(next, req);
    res.status(OK).json({
      status: "success",
      message: "News successfully deleted",
      data: null,
    });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

const delete_news_image = async (req: Request, res: Response, next: NextFunction) => {
  try {

    await newsServices.delete_single_image(req);

      res.status(OK).json({
        status: "success",
        message: "Image successfully deleted",
        data: null,
      });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

const valid_news = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await newsServices.updValid(next, req);
    return res.status(OK).json({
      status: "success",
      message: "Updated News status successfully",
      data: null,
    });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

export default {
  new_news,
  upd_news,
  single_news,
  fetch_news_active,
  delete_news,
  valid_news,
  fetch_news_all,
  upd_news_img,
  delete_news_image,
  fetch_news_limit
};
