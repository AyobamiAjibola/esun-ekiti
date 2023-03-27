import { NextFunction, Request } from "express";
import JWT from "jsonwebtoken";
import { Op } from "sequelize";
import { BAD_REQUEST, UNAUTHORIZED } from "../constants/response-codes";
// import db from '../sequelize/models';
import AppError from "./appError";
import UserToken from "../models/UserToken"

// const { UserToken } = db

export const verifyRefreshToken = async (refreshToken: string, req: Request, next: NextFunction) => {
	try {
		if (!refreshToken) return new AppError("Invalid", UNAUTHORIZED);;
		const fetch = await UserToken.findOne({ where: {token: refreshToken }})
		if(!fetch) {
			return new AppError("Invalid refresh token", BAD_REQUEST);
		}
		const data: any = JWT.verify(
			refreshToken,
			process.env.REFRESH_TOKEN_PUBLIC_KEY as string
		)

		const db_token = await UserToken
		.findOne(
			{ where:
				{
					UserId: data.id,
					expired_at: { [Op.gte]: new Date() }
				}
			}
		)
		if(!db_token){
			return new AppError("Invalid refresh token", BAD_REQUEST);
		}

		req.data = data;

	} catch (error: any) {
		return new AppError(error, BAD_REQUEST);
	}
}