import { NextFunction, Request, Response } from "express";
import db from "../../sequelize/models";
import { BAD_REQUEST, OK, RESOURCE_CREATED } from "../../constants/response-codes";
import * as userValidator from "./user.validator";
import AppError from "../../utils/appError";
import * as usersServices from "./user.services";

const { sequelize } = db;

//= =================== CREATE ADMIN ==================//
const register_admin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const validate = userValidator.postAdmin(req.body);
    // if (validate.error) {
    //   return next(new AppError(validate.error.message, BAD_REQUEST));
    // }

    const newAdminUser = await usersServices.adminReg(req.body, next, req, res);

    return res.status(RESOURCE_CREATED).json({
      status: "success",
      message: "User created successfully",
      data: { newAdminUser },
    });

  } catch (error: any) {
    next(new AppError(error.message, BAD_REQUEST));
  }
};

//= ======== UPDATE USER =======//
const updateUser = async (req: Request, res: Response, next: NextFunction) => {

  try {
      // const validate = userValidator.updAdmin(req.body);
      // if (validate.error) {
      //   return next(new AppError(validate.error.message, BAD_REQUEST));
      // }

      await usersServices.updateUser(req.body, next, req)

      return res.status(OK).json({
        status: "success",
        message: "Updated successfully",
        data: null,
      });

  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

//= ======== GET CURRENT USER =======//
const single_user = async (req: Request, res: Response, next: NextFunction) => {
  try {

      const singleUser = await usersServices.singleUser(next, req);
      return res.status(OK).json({
        status: "success",
        message: "Fetch successful",
        data: { singleUser }
      });

  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

//= ============== DELETE USER =======================//
const delete_user = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await usersServices.deleteUser(next, req.params.id, req, res);
    return res.status(OK).json({
      status: "success",
      message: "Account successfully deleted",
      data: null,
    });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

//= ======== GET ALL THE USERS =======//
const fetch_users = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await usersServices.fetchUser(next, req);
    return res.status(OK).json({
      status: "success",
      message: "Fetch successful",
      data: { result },
    });
  } catch (error: any) {
    res.status(BAD_REQUEST).send(error.message);
  }
};

export default {
  register_admin,
  single_user,
  updateUser,
  delete_user,
  fetch_users,
};
