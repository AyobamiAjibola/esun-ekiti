import { Request, Response, NextFunction } from 'express';
import JWT from "jsonwebtoken";
import { FORBIDDEN } from '../constants/response-codes';
import AppError from '../utils/appError';

export const auth = async (req: Request, res: Response, next: NextFunction) => {

	try {
		const token = req.header && req.header("Authorization")?.split(" ")[1];

		if (!token) {
			return next(new AppError("You are not logged in, please log in to get access", FORBIDDEN));
		}
		const tokenDetails = JWT.verify(
			token,
			process.env.ACCESS_TOKEN_PRIVATE_KEY as string
		);
		if(tokenDetails === undefined){
			return next(new AppError("Access Denied: Invalid token data", FORBIDDEN));
		}
		req.data = tokenDetails;
		next();
		// JWT.verify(
		//     token,
		//     process.env.ACCESS_TOKEN_PRIVATE_KEY as string,
		//     (err: any, decoded: any) => {
		//         if (err) return next(new AppError("Access Denied: Invalid token data", FORBIDDEN));
		//         req.phone_num = decoded?.UserInfo.phone_num;
		//         req.role = decoded?.UserInfo.role;
		//         next();
		//     }
		// );
	} catch (err) {
		return next(new AppError("Access Denied: Invalid token", FORBIDDEN));
	}
};
