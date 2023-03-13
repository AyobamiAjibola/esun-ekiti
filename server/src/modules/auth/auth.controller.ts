import { NextFunction, Request, Response } from "express";
import { BAD_REQUEST, OK } from "../../constants/response-codes";
import AppError from "../../utils/appError";
import { adminLogin, logout, refreshToks } from "./auth.services";
import * as authValidator from "./auth.validator";

//= ============================== ADMIN ===============================//
const login_admin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validate = authValidator.authLogin(req.body);
    if (validate.error) {
      return next(new AppError(validate.error.message, BAD_REQUEST));
    }

    const fetch = await adminLogin(res, req.body, next);
    const token = fetch?.token;

    return res.status(OK).json({
        status: "success",
        message: "Login was successful.",
        token
      });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

//========================= GET NEW ACCESS TOKEN =================//
const new_access_token = async (req: Request, res: Response, next: NextFunction) => {
  try {

    await refreshToks(req, res, next);

  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

//========================= LOGOUT =================//
const logout_user = async (req: Request, res: Response, next: NextFunction) => {
  try {

    await logout(req, res, next)

    res.status(200).json({
      error: false,
      message: "Logged Out Successfully"
    });

  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

export default {
  login_admin,
  new_access_token,
  logout_user
};
