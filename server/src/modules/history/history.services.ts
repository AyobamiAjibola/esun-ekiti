import { NextFunction, Request } from "express";
import fs from "fs";
import { resolve } from "path";
import { BAD_REQUEST, FORBIDDEN, OK } from "../../constants/response-codes";
import AppError from "../../utils/appError";
import { HistoryType } from "./history.types";
import { Op, Sequelize } from "sequelize";
const db = require('../../sequelize/models').default;

const { sequelize } = db;
const { History } = db;

export const history = async (body: HistoryType, next: NextFunction, req: Request) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    const fetch = await History?.findOne({where: {esun: 'esun'}});
    if(fetch) return next(new AppError("History already curated", FORBIDDEN));

    // const filenames = req.files! as Array<Express.Multer.File>;
    // const images = filenames.map((file) => file.filename);

    const create_history = await History?.create({
      ...req.body
    });
    await transaction.commit();

    return create_history;
  } catch (e: any) {
    if (transaction) {
      await transaction.rollback();
    }
    return next(new AppError(e, BAD_REQUEST));
  }
};

export const updHistory = async (body: HistoryType, next: NextFunction, req: Request) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    const { history } = body;

    const upd_history = await History?.update(
      {
        history
      },
      { where: { esun: 'esun' } },
      { transaction }
    );
    await transaction.commit();

    return upd_history;
  } catch (e: any) {
    if (transaction) {
      await transaction.rollback();
    }
    return next(new AppError(e, BAD_REQUEST));
  }
};

export const updHistoryImg = async (body: HistoryType, next: NextFunction, req: Request) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

      const filenames = req.files! as Array<Express.Multer.File>;
      const img = filenames.map((file) => file.filename);

      const new_image: any = [];

      img.map((value) => {
        new_image.push(value);
      });

      const main_img = new_image.toString();

      await History?.update(
        { image: Sequelize.fn("array_append", Sequelize.col("image"), main_img) },
        { where: { esun: 'esun' } },
        { transaction }
      );

    await transaction.commit();

  } catch (e: any) {
    if (transaction) {
      await transaction.rollback();
    }
    return next(new AppError(e, BAD_REQUEST));
  }
};

export const fetchHistory = async (next: NextFunction, req: Request) => {
    try {

      const result = await History?.findOne({where: { esun: 'esun' }});

      function limit (string = '', limit = 0) {
        return string.substring(0, limit)
      }

      const fetch = limit(result?.history, 1062)

      return { result, fetch };
    } catch (e: any) {
      return next(new AppError(e, BAD_REQUEST));
    }
};

export const readSingleHistory = async (next: NextFunction, req: Request) => {
  try {
    const single_history = await History?.findOne({ where: { id: req.params.id } });
    return single_history;
  } catch (e: any) {
    return next(new AppError(e, BAD_REQUEST));
  }
};

export const delHistory = async (next: NextFunction, req: Request) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    const fetch = await History?.findOne({ where: { id: req.params.id } }, { transaction });
    const img = fs.readdirSync(resolve(__dirname, "../../../uploads"));
    img.map((value) => {
      if (fetch.dataValues.images.includes(value)) {
        fs.unlinkSync(resolve(__dirname, `../../../uploads/${value}`));
      }
    });

    const del = await History?.destroy({ where: { id: req.params.id } });
    await transaction.commit();
    return del;
  } catch (e: any) {
    if (transaction) {
      await transaction.rollback();
    }
    return next(new AppError(e, BAD_REQUEST));
  }
};

export const delete_single_image = async (req: Request) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();
    const rmv = req.params.id; // front end will give me the name of the image

    await History?.update(
      { image: Sequelize.fn("array_remove", Sequelize.col("image"), rmv) },
      { where: { esun: 'esun' } },
      { transaction }
    );

    const files = fs.readdirSync(resolve(__dirname, '../../../uploads'));
    files.map((value) => {
      if(value === rmv){
        fs.unlinkSync(resolve(__dirname, `../../../uploads/${value}`));
      }
    });

    await transaction.commit();
  } catch (error: any) {
    // res.status(BAD_REQUEST).send(error.message);
    if (transaction) {
      await transaction.rollback();
    }
  }
};