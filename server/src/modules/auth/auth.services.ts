import { Request, Response, NextFunction } from "express";
import { AuthType } from "./auth.types";
import { jwtGenerator } from "../../utils/jwtGenerator";
import JWT from "jsonwebtoken";
import { BAD_REQUEST } from "../../constants/response-codes";
import AppError from "../../utils/appError";
import { verifyBcryptPassword } from "../../utils/auth";
import { verifyRefreshToken } from "../../utils/verifyRefreshToken";
import UserToken from "../../models/UserToken";
import Admin from "../../models/Admin";

export const adminLogin = async (body: AuthType, next: NextFunction) => {
    const { phone_num, password } = body;

    const user = await Admin?.findOne({ where: { phone_num } });

    if (!user || user === null) {
      return next(new AppError("Invalid phone number or password", BAD_REQUEST));
    }

    const isMatch = verifyBcryptPassword(password, user.password);
    if (!isMatch) {
      return next(new AppError("Invalid phone number or password", BAD_REQUEST));
    }

    const { token, refreshToken } = await jwtGenerator(user.dataValues);

    return {token, refreshToken};
};

export const refreshToks = async (req: Request, res: Response, next: NextFunction) => {

    await verifyRefreshToken(req.cookies['refreshToken'], req, next)

    if(req.data === undefined){
      return next(new AppError("Access Denied: Invalid token", 403));
    }

    const payload = {
            id: req.data.id,
            // phone_num: req.data.phone_num,
            role: req.data.role
        };

    const token = JWT.sign(
      payload,
      `${process.env.ACCESS_TOKEN_PRIVATE_KEY}`,
      { expiresIn: process.env.JWT_ACCESS_TOKEN_TIME_LIMIT }
    );
    console.log(token)
    res.status(200).json({ token });
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.cookies['refreshToken'];

    if(token){
      await UserToken?.destroy({ where: {token: token }});
      res.cookie('refreshToken', '', {
        httpOnly: true,
        maxAge: 0
      })
    }
};

export const cookie = async (req: Request, res: Response, next: NextFunction) => {

    const cookie = req.cookies['refreshToken'];
    // const cookies = req.headers.cookie;
    // if(cookies){
    //   const cookieArray = cookies.split(';');

    //   let refreshToken = null;
    //   for (const cookie of cookieArray) {
    //     const [name, value] = cookie.trim().split('=');
    //     if (name === 'refreshToken') {
    //       refreshToken = value;
    //       break;
    //     }
    //   }

    //   return refreshToken
    // }
    return cookie;
};
