import { NextFunction, Request, Response } from "express";
import { BAD_REQUEST, RESOURCE_CREATED } from "../../constants/response-codes";
import AppError from "../../utils/appError";
import { UserType } from "./user.types";
import { hash } from "../../utils/auth";
import UserToken from "../../models/UserToken";
import Admin from "../../models/Admin"

export const adminReg = async (body: UserType, next: NextFunction, req: Request, res: Response) => {

    const { phone_num, unique, user_type } = body;

    const user = await Admin.findOne({ where: { phone_num } });
    if (user) {
      return next(new AppError("Phone number already in use", BAD_REQUEST));
    }

    if(user_type === 'admin'){
      if(unique !== 'mofaramade') {
        return next(new AppError("Unique admin text is not correct", BAD_REQUEST));
      }
    }

    const hashPass = hash(req.body.password);
    const hashConfirmPass = hash(req.body.confirm_password);
    const newAdminUser = await Admin.create(
      {
        ...req.body,
        password: hashPass,
        confirm_password: hashConfirmPass,
      }
    );

    return newAdminUser;
};

export const updateUser = async (body: UserType, next: NextFunction, req: Request) => {

    if (req.body.password || req.body.confirm_password) {
      req.body.password = hash(req.body.password);
      req.body.confirm_password = hash(req.body.confirm_password);
    }

    const { phone_num, password, confirm_password } = body;

    const fetch = await Admin.findOne({where: {phone_num: req.params.id}});
    if (phone_num) {
      const user = await Admin.findOne({ where: { phone_num } });
      if (user && user.dataValues.phone_num !== fetch?.dataValues.phone_num) {
        return next(new AppError("A user with this phone number already exist", BAD_REQUEST));
      }
    }

    const user = await Admin?.update(
      {
        ...req.body,
        password,
        confirm_password,
      },
      { where: {phone_num: req.params.id } }
    );

    return user;

};

export const singleUser = async (next: NextFunction, req: Request) => {

  const user = await Admin?.findOne({ where: { phone_num: req.params.id } });
  return user;

};

export const deleteUser = async (next: NextFunction, userId: string, req: Request, res: Response) => {

    const fetch = await Admin.findOne({where: {phone_num: userId}});

    if(fetch?.dataValues.id === req.data.id) {
      await Admin.destroy({ where: { phone_num: userId } });
      const token = req.cookies['refreshToken'];

      if(token){
        await UserToken?.destroy({ where: {token: token }});
        res.cookie('refreshToken', '', {
          httpOnly: true,
          maxAge: 0
        })
      }
    } else {
      await Admin.destroy({ where: { phone_num: userId } });
    }

};

export const fetchUser = async (next: NextFunction, req: Request) => {

  const admin = await Admin.findAll();
  return admin

};
