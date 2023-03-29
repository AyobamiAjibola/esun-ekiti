import { NextFunction, Request } from "express";
import { BAD_REQUEST } from "../../constants/response-codes";
import AppError from "../../utils/appError";
import fs from "fs";
import { resolve } from "path";
import { EventType } from "./event.types";
import { Op, Sequelize } from "sequelize";
import { getPagination, getPagingData } from "../../helpers/Pagination";
import Event from "../../models/Event";

export const newEvent = async (body: EventType, next: NextFunction, req: Request) => {

    const { name, detail } = body;

    const evt = await Event.findOne({ where: { name } });
    if (evt) {
      return next(new AppError("This event already exist", BAD_REQUEST));
    }

    const create_event = await Event.create({
      ...req.body,
      name,
      detail
    });

    return create_event;

};

export const updEvent = async (body: EventType, next: NextFunction, req: Request) => {

    const { name, detail } = body;

    const evt = await Event.findOne({ where: { name } });
    const fetch = await Event.findOne({ where: { name: req.params.id } });
    if (evt) {
      if(evt && evt.dataValues.name !== fetch?.dataValues.name)
      return next(new AppError("Event name already in use", BAD_REQUEST));
    }

    const upd = await Event.update(
      {
        name,
        detail
      },
      { where: { name: req.params.id } }
    );

    return upd;

};

export const updEventImg = async (next: NextFunction, req: Request) => {

      const filenames = req.files! as Array<Express.Multer.File>;
      const img = filenames.map((file) => file.filename);

      const new_image: any = [];

      img.map((value) => {
        new_image.push(value);
      });

      const main_img = new_image.toString();
      await Event.update(
        { image: Sequelize.fn("array_append", Sequelize.col("image"), main_img) },
        { where: { name: req.params.id } }
      );

};

export const readSingleEvent = async (next: NextFunction, req: Request) => {

  const single_event = await Event.findOne({ where: { name: req.params.id } });
  return single_event;

};

export const fetchEventClient = async (next: NextFunction, req: Request) => {

    const { page, size } = req.query;

    const { limit, offset } = getPagination(page, size);
    const evt = await Event.findAndCountAll({
      where: { isEvent: "active" },
      limit,
      offset,
      order: [
        ["createdAt", "ASC"]
      ]
    });

    // for (let i = 1; i < biz.length; i++) {
    //   for (let j = i; j > 0; j--) {
    //     const _t1: any = biz[j];
    //     const _t0: any = biz[j - 1];

    //     if (new Date(_t1.createdAt).getTime() > new Date(_t0.createdAt).getTime()) {
    //       biz[j] = _t0;
    //       biz[j - 1] = _t1;

    //       // console.log('sorted')
    //     } else {
    //       // console.log('no sorted')
    //     }
    //   }
    // }

    const result = getPagingData(evt, page, limit);
    const array: any = [];
    result?.result?.map((value: any) => {
      function limit (string = '', limit = 0) {
        return string.substring(0, limit)
      }

      const fetch = limit(value?.detail, 200);
      array.push
        ({
          id: value?.id,
          detail: fetch,
          image: value?.image && value?.image[0],
          name: value?.name.toUpperCase()
        })
      });

    return {array, result};

};

export const fetchEvents = async (next: NextFunction, req: Request) => {

    const { q } = req.query;
    const keys = ["name"];
    const search = (data: any) => {
      return data.filter((item: any) => keys.some((key) => item[key].toLowerCase().includes(q)));
    };

    const evt = await Event.findAll({
      where: {isEvent: "active"}
    });

    for (let i = 1; i < evt.length; i++) {
      for (let j = i; j > 0; j--) {
        const _t1: any = evt[j];
        const _t0: any = evt[j - 1];

        if (new Date(_t1.createdAt).getTime() > new Date(_t0.createdAt).getTime()) {
          evt[j] = _t0;
          evt[j - 1] = _t1;

          // console.log('sorted')
        } else {
          // console.log('no sorted')
        }
      }
    }

    const result = q ? search(evt) : evt;
    const array: any = [];

    result?.map((value: any) => {
      function limit (string = '', limit = 0) {
        return string.substring(0, limit)
      }

      const fetch = limit(value?.detail, 187);
      array.push
        ({id: value.id,
          detail: fetch,
          image: value?.image && value?.image[0],
          name: value.name.toUpperCase(),
          createdAt: value.createdAt.toLocaleString('en-US'),
          status: value.status
        })
    })


    return { result, array };

};

export const delEvent = async (next: NextFunction, req: Request) => {

    const fetch = await Event.findOne({ where: { name: req.params.id } });
    const img = fs.readdirSync(resolve(__dirname, "../../../uploads"));
    img.map((value) => {
      if(fetch?.dataValues.image !== null){
        if (fetch?.dataValues.image.includes(value)) {
          fs.unlinkSync(resolve(__dirname, `../../../uploads/${value}`));
        }
      }
    });

    await Event.destroy({ where: { name: req.params.id } });

};

export const delete_single_image = async (req: Request, next: NextFunction) => {

    const rmv = req.params.id; // front end will give me the name of the image

    await Event.update(
      { image: Sequelize.fn("array_remove", Sequelize.col("image"), rmv) },
      { where: { isEvent: 'active' } }
    );

    const files = fs.readdirSync(resolve(__dirname, '../../../uploads'));
    files.map((value) => {
      if(value === rmv){
        fs.unlinkSync(resolve(__dirname, `../../../uploads/${value}`));
      }
    });

};
