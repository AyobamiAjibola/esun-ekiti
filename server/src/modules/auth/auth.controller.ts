import { NextFunction, Request, Response } from "express";
import { BAD_REQUEST, OK } from "../../constants/response-codes";
import AppError from "../../utils/appError";
import { adminLogin, cookie, logout, refreshToks } from "./auth.services";
import * as authValidator from "./auth.validator";


//= ============================== ADMIN ===============================//
// const login_admin = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const validate = authValidator.authLogin(req.body);
//     if (validate.error) {
//       return next(new AppError(validate.error.message, BAD_REQUEST));
//     }

//     const fetch = await adminLogin(res, req.body, next);
//     const token = fetch?.token;

//     res.status(OK).json({
//       status: "success",
//       message: "Login was successful.",
//       token
//     });

//   } catch (error: any) {
//     return next(new AppError(error.message, BAD_REQUEST));
//   }
// };
const login_admin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validate = authValidator.authLogin(req.body);
    if (validate.error) {
      return next(new AppError(validate.error.message, BAD_REQUEST));
    }

    //@ts-ignore
    const { token, refreshToken } = await adminLogin(req.body, next);

    // res.setHeader('Access-Control-Allow-Credentials', 'true');
    // const expiresDate = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);
    // const expiresFormatted = expiresDate.toUTCString();
    // const cookieOptions = [
    //   `HttpOnly`,
    //   `Path=/`,
    //   `Secure=false`,
    //   `SameSite=none`,
    //   `Domain=${process.env.BASE_URL}`,
    //   `Expires=${expiresFormatted}`
    // ];
    // const cookieString = `refreshToken=${refreshToken}; ${cookieOptions.join('; ')}`;
    // const cookieString = `refreshToken=${refreshToken}; ${Object.entries(cookieOptions)
    //   .map(([key, value]) => `${key}=${value}`)
    //   .join('; ')}`;

    // res.setHeader('Set-Cookie', cookieString);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
      domain: process.env.BASE_URL,
      expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
      sameSite: 'none',
      secure: true
    });

    res.status(OK).json({
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

const get_cookie = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const cookies = await cookie(req, res, next);
    res.status(200).json({
      error: false,
      cookie: cookies
    });

  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

export default {
  login_admin,
  new_access_token,
  logout_user,
  get_cookie
};
