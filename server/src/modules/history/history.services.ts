import { NextFunction, Request } from "express";
import fs from "fs";
import { resolve } from "path";
import { BAD_REQUEST, FORBIDDEN, OK } from "../../constants/response-codes";
import AppError from "../../utils/appError";
import { HistoryType } from "./history.types";
import { Op, Sequelize } from "sequelize";
import History from '../../models/History';

export const history = async (body: HistoryType, next: NextFunction, req: Request) => {

    const fetch = await History.findOne({where: {esun: 'esun'}});
    if(fetch) return next(new AppError("History already curated", FORBIDDEN));

    // const filenames = req.files! as Array<Express.Multer.File>;
    // const images = filenames.map((file) => file.filename);

    const create_history = await History.create({
      ...req.body
    });

    return create_history;
};

export const updHistory = async (body: HistoryType, next: NextFunction, req: Request) => {

    const { history } = body;

    const upd_history = await History.update(
      {
        history
      },
      { where: { esun: 'esun' } }
    );

    return upd_history;

};

export const updHistoryImg = async (body: HistoryType, next: NextFunction, req: Request) => {

      const filenames = req.files! as Array<Express.Multer.File>;
      const img = filenames.map((file) => file.filename);

      const new_image: any = [];

      img.map((value) => {
        new_image.push(value);
      });

      const main_img = new_image.toString();

      await History.update(
        { image: Sequelize.fn("array_append", Sequelize.col("image"), main_img) },
        { where: { esun: 'esun' } }
      );

};

export const fetchHistory = async (next: NextFunction, req: Request) => {

  const result = await History.findOne({where: { esun: 'esun' }});

  function limit (string = '', limit = 0) {
    return string.substring(0, limit)
  }

  const fetch = limit(result?.history, 1062)

  return { result, fetch };

};

export const readSingleHistory = async (next: NextFunction, req: Request) => {

  const single_history = await History?.findOne({ where: { id: req.params.id } });
  return single_history;

};

export const delHistory = async (next: NextFunction, req: Request) => {

  const fetch = await History.findOne({ where: { id: req.params.id } });
  const img = fs.readdirSync(resolve(__dirname, "../../../uploads"));
  img.map((value) => {
    if (fetch?.dataValues.image.includes(value)) {
      fs.unlinkSync(resolve(__dirname, `../../../uploads/${value}`));
    }
  });

  const del = await History.destroy({ where: { id: req.params.id } });
  return del;

};

export const delete_single_image = async (req: Request) => {

  const rmv = req.params.id; // front end will give me the name of the image
  await History.update(
    { image: Sequelize.fn("array_remove", Sequelize.col("image"), rmv) },
    { where: { esun: 'esun' } }
  );

  const files = fs.readdirSync(resolve(__dirname, '../../../uploads'));
  files.map((value) => {
    if(value === rmv){
      fs.unlinkSync(resolve(__dirname, `../../../uploads/${value}`));
    }
  });

};