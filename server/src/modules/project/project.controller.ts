import { NextFunction, Request, Response } from "express";
import { BAD_REQUEST, OK, RESOURCE_CREATED } from "../../constants/response-codes";
import AppError from "../../utils/appError";
import * as projectValidator from "./project.validators";
import * as projectServices from "./project.services";

//= =================== NEW PROJECT ==================//
const new_project = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validate = projectValidator.postProject(req.body);
    if (validate.error) {
      return next(new AppError(validate.error.message, BAD_REQUEST));
    }

    const project = await projectServices.newProject(req.body, next, req);

    project &&
      res.status(RESOURCE_CREATED).json({
        status: "success",
        message: "Project created successfully",
        data: { project },
      });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

//= =================== UPDATE PROJECT ==================//
const upd_project = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validate = projectValidator.updProject(req.body);
    if (validate.error) {
      return next(new AppError(validate.error.message, BAD_REQUEST));
    }

    await projectServices.updProject(req.body, next, req);

    return res.status(OK).json({
      status: "success",
      message: "Project updated successfully",
      data: null,
    });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

const upd_project_img = async (req: Request, res: Response, next: NextFunction) => {
  try {

    await projectServices.updProjectImg(req.body, next, req);

    return res.status(OK).json({
      status: "success",
      message: "Updated successfully",
      data: null,
    });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

//= =================== FETCH SINGLE PROJECT ==================//
const single_project = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const singleProject = await projectServices.readSingleProject(next, req);
    return res.status(OK).json({
      status: "success",
      message: "Fetch successful",
      data: { singleProject },
    });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

//= =================== FETCH PROJECT ==================//
const fetch_project = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await projectServices.fetchProject(next, req);
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

const fetch_project_client = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await projectServices.fetchProjectClient(next, req);
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

const fetch_project_limit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await projectServices.fetchProjectLimit(next, req);

    return res.status(OK).json({
      status: "success",
      message: "Fetch successful",
      data: { result }
    });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

const delete_project = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const del = await projectServices.delProject(next, req);
    del &&
      res.status(OK).json({
        status: "success",
        message: "Project successfully deleted",
        data: null,
      });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

const delete_project_image = async (req: Request, res: Response, next: NextFunction) => {
  try {

    await projectServices.delete_single_image(req);

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
  new_project,
  upd_project,
  single_project,
  fetch_project,
  delete_project,
  upd_project_img,
  delete_project_image,
  fetch_project_limit,
  fetch_project_client
};
