import { Request, Response, NextFunction } from "express";
import { AuthType } from "./auth.types";
import { jwtGenerator } from "../../utils/jwtGenerator";
import JWT from "jsonwebtoken";
import db from "../../sequelize/models";
import { BAD_REQUEST } from "../../constants/response-codes";
import AppError from "../../utils/appError";
import { verifyBcryptPassword } from "../../utils/auth";
import { verifyRefreshToken } from "../../utils/verifyRefreshToken";

const { Admin } = db;
const { sequelize } = db;
const { UserToken } = db;

export const adminLogin = async (res: Response, body: AuthType, next: NextFunction) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    const { phone_num, password } = body;

    const user = await Admin.findOne({ where: { phone_num } }, { transaction });

    if (!user || user === null) {
      return next(new AppError("Invalid phone number or password", BAD_REQUEST));
    }

    const isMatch = verifyBcryptPassword(password, user.password);
    if (!isMatch) {
      return next(new AppError("Invalid phone number or password", BAD_REQUEST));
    }

    await transaction.commit();
    const { token, refreshToken } = await jwtGenerator(user.dataValues);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000 //7 days
    });

    return {token};
  } catch (e: any) {
    if (transaction) {
      await transaction.rollback();
    }
    return next(new AppError(e, BAD_REQUEST));
  }
};

export const refreshToks = async (req: Request, res: Response, next: NextFunction) => {

  try {

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
    res.status(200).json({ token });
    // const cookies = req.cookies;
    // if (!cookies?.refreshToken) return res.sendStatus(401);
    // const refToken = cookies.refreshToken;

    // const foundUser = await UserToken.findOne({ where: {token: refToken} });
    // const fetchUser = await Admin.findOne({where: { id: foundUser.dataValues.UserId }});

    // if (!fetchUser) return next(new AppError("No such user in db", FORBIDDEN));

    // JWT.verify(
		// 	refToken,
		// 	process.env.REFRESH_TOKEN_PUBLIC_KEY as any,
		// 	(err: any, decoded: any) => {
		// 		if (err || fetchUser.dataValues.phone_num !== decoded.UserInfo.phone_num) return next(new AppError("Invalid", FORBIDDEN));
    //         const token = JWT.sign(
    //             {
    //                 "UserInfo": {
    //                     "phone_num": decoded?.phone_num,
    //                     "role": decoded?.user_type
    //                 }
    //             },
    //             `${process.env.ACCESS_TOKEN_PRIVATE_KEY}`,
    //             { expiresIn: process.env.JWT_ACCESS_TOKEN_TIME_LIMIT }
    //         );
    //         res.json({ token })
		// 	}
		// )
  } catch (e: any) {
    return next(new AppError(e, BAD_REQUEST));
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const token = req.cookies['refreshToken'];

    if(token){
      await UserToken.destroy({ where: {token: token }});
      res.cookie('refreshToken', '', {
        httpOnly: true,
        maxAge: 0
      })
    }

  } catch (e: any) {
    return next(new AppError(e, BAD_REQUEST));
  }
};

export const cookie = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const token = req.cookies['refreshToken'];

    return token

  } catch (e: any) {
    return next(new AppError(e, BAD_REQUEST));
  }
};
