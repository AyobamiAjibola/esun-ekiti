import { Request, Response, NextFunction } from 'express';

export const roleCheck = (roles: any) => {
	return (req: Request, res: Response, next: NextFunction) => {
		// roles.push("admin");
		console.log(req.data)
		if (req.data.role.includes(...roles)) {
			next();
		} else {
			res.status(403).json({ error: true, message: "You are not authorized" });
		}
	};
};