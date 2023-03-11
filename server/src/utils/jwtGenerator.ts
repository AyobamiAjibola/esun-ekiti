import JWT from "jsonwebtoken";
import { resolve } from "path";
import dotenv from "dotenv";
import db from "../sequelize/models";

const { UserToken } = db;
dotenv.config({ path: resolve(__dirname, "../.env") });

export const jwtGenerator = async (user: any) => {
	try {
		const payload = {
			id: user.id,
			phone_num: user.phone_num,
			role: user.user_type,
    	};

		const token = JWT.sign(
			payload,
			`${process.env.ACCESS_TOKEN_PRIVATE_KEY}`,
			{ expiresIn: process.env.JWT_ACCESS_TOKEN_TIME_LIMIT}
		);

		const info = {
			role: user.user_type,
			id: user.id
    	};
		const refreshToken = JWT.sign(
			info,
			`${process.env.REFRESH_TOKEN_PUBLIC_KEY}`,
			{ expiresIn: process.env.JWT_REFRESH_TOKEN_TIME_LIMIT }
		);

		const userToken = await UserToken.findOne({ where: {UserId: user.id }});
		if (userToken) await UserToken.destroy({ where: {UserId: user.id }});

		const expired = new Date()
		expired.setDate(expired.getDate() + 7)

		await UserToken.create({
			UserId: user.id,
			token: refreshToken,
			expired_at: expired
		});
		return Promise.resolve({ token, refreshToken });
	} catch (err) {
		return Promise.reject(err);
	}
};
