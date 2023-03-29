import { NextFunction, Request, Response } from "express";
import { BAD_REQUEST, OK, RESOURCE_CREATED } from "../../constants/response-codes";
import AppError from "../../utils/appError";
import * as eventValidator from "./event.validators";
import * as eventServices from "./event.services";

//= =================== NEW EVENT ==================//
const new_event = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validate = eventValidator.postEvent(req.body);
    if (validate.error) {
      return next(new AppError(validate.error.message, BAD_REQUEST));
    }

    const newEvent = await eventServices.newEvent(req.body, next, req);

    newEvent &&
      res.status(RESOURCE_CREATED).json({
        status: "success",
        message: "Event created successfully",
        data: { newEvent },
      });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

//= =================== UPDATE EVENT ==================//
const upd_event = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validate = eventValidator.updEvent(req.body);
    if (validate.error) {
      return next(new AppError(validate.error.message, BAD_REQUEST));
    }

    await eventServices.updEvent(req.body, next, req);

    return res.status(OK).json({
      status: "success",
      message: "Event updated successfully",
      data: null,
    });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

const upd_event_img = async (req: Request, res: Response, next: NextFunction) => {
  try {

    await eventServices.updEventImg(next, req);

    return res.status(OK).json({
      status: "success",
      message: "Updated successfully",
      data: null,
    });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

//= =================== FETCH SINGLE EVENT ==================//
const single_event = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const singleEvent = await eventServices.readSingleEvent(next, req);
    return res.status(OK).json({
      status: "success",
      message: "Fetch successful",
      data: { singleEvent },
    });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

//= =================== FETCH EVENT ==================//
const fetch_event = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await eventServices.fetchEvents(next, req);
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

const fetch_event_client = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await eventServices.fetchEventClient(next, req);
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

const delete_event = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await eventServices.delEvent(next, req);
    return res.status(OK).json({
      status: "success",
      message: "Event successfully deleted",
      data: null,
    });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

const delete_event_image = async (req: Request, res: Response, next: NextFunction) => {
  try {

    await eventServices.delete_single_image(req, next);

      res.status(OK).json({
        status: "success",
        message: "Image successfully deleted",
        data: null,
      });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

export default {
  new_event,
  upd_event,
  single_event,
  fetch_event,
  delete_event,
  upd_event_img,
  fetch_event_client,
  delete_event_image
};
