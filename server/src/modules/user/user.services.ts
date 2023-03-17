import { NextFunction, Request, Response } from "express";
import { jwtGenerator } from "../../utils/jwtGenerator";
import { BAD_REQUEST, RESOURCE_CREATED } from "../../constants/response-codes";
import AppError from "../../utils/appError";
import { UserType } from "./user.types";
import { hash } from "../../utils/auth";
const db = require('../../sequelize/models').default;

const { Admin } = db;
const { sequelize } = db;
const { UserToken } = db;

export const adminReg = async (body: UserType, next: NextFunction, req: Request, res: Response) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    const { phone_num, unique, user_type } = body;

    const user = await Admin?.findOne({ where: { phone_num } }, { transaction });
    if (user) {
      return next(new AppError("Phone number already in use", BAD_REQUEST));
    }

    if(user_type === 'admin'){
      if(unique !== 'mofaramade') {
        return next(new AppError("Unique admin text is not correct", BAD_REQUEST));
      }
    }
    console.log(req.body)
    const hashPass = hash(req.body.password);
    const hashConfirmPass = hash(req.body.confirm_password);
    const newAdminUser = await Admin.create(
      {
        ...req.body,
        password: hashPass,
        confirm_password: hashConfirmPass,
      },
      { transaction }
    );

    await transaction.commit();
    return newAdminUser;

  } catch (e: any) {
    if (transaction) {
      await transaction.rollback();
    }
    return next(new AppError(e, BAD_REQUEST));
  }
};

export const updateUser = async (body: UserType, next: NextFunction, req: Request) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    if (req.body.password || req.body.confirm_password) {
      req.body.password = hash(req.body.password);
      req.body.confirm_password = hash(req.body.confirm_password);
    }

    const { phone_num, password, confirm_password } = body;

    const fetch = await Admin?.findOne({where: {phone_num: req.params.id}}, { transaction });
    if (phone_num) {
      const user = await Admin?.findOne({ where: { phone_num } }, { transaction });
      if (user && user.dataValues.phone_num !== fetch.dataValues.phone_num) {
        return next(new AppError("A user with this phone number already exist", BAD_REQUEST));
      }
    }

    const user = await Admin?.update(
      {
        ...req.body,
        password,
        confirm_password,
      },
      { where: {phone_num: req.params.id } },
      { transaction }
    );
    await transaction.commit();
    return user;

  } catch (e: any) {
    if (transaction) {
      await transaction.rollback();
    }
    return next(new AppError(e, BAD_REQUEST));
  }
};

export const singleUser = async (next: NextFunction, req: Request) => {
  try {

    const user = await Admin?.findOne({ where: { phone_num: req.params.id } });
    return user;

  } catch (e: any) {
    return next(new AppError(e, BAD_REQUEST));
  }
};

export const deleteUser = async (next: NextFunction, userId: string, req: Request, res: Response) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    const fetch = await Admin?.findOne({where: {phone_num: userId}});

      if(fetch.dataValues.id === req.data.id) {
        await Admin?.destroy({ where: { phone_num: userId } }, { transaction });
        const token = req.cookies['refreshToken'];

        if(token){
          await UserToken?.destroy({ where: {token: token }}, { transaction });
          res.cookie('refreshToken', '', {
            httpOnly: true,
            maxAge: 0
          })
        }
      } else {
        await Admin?.destroy({ where: { phone_num: userId } }, { transaction });
      }

    await transaction.commit();

  } catch (e: any) {
    if (transaction) {
      await transaction.rollback();
    }
    return next(new AppError(e, BAD_REQUEST));
  }
};

export const fetchUser = async (next: NextFunction, req: Request) => {
  try {

    const admin = await Admin?.findAll();

    return admin;
  } catch (e: any) {
    return next(new AppError(e, BAD_REQUEST));
  }
};
