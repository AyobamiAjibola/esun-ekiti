import { NextFunction, Request } from "express";
import fs from "fs";
import { resolve } from "path";
import { BAD_REQUEST } from "../../constants/response-codes";
import AppError from "../../utils/appError";
import { NewsType } from "./news.types";
import { Op, Sequelize } from "sequelize";
import { getPagination, getPagingData } from "../../helpers/Pagination";
import News from '../../models/News';

export const newNews = async (body: NewsType, next: NextFunction, req: Request) => {

  // const filenames = req.files! as Array<Express.Multer.File>;
  // const image = filenames.map((file) => file.filename);

  const create_news = await News.create({
    ...req.body
  });

  return create_news;

};

export const updNews = async (body: NewsType, next: NextFunction, req: Request) => {

  const upd_news = await News.update(
    {
      ...req.body
    },
    { where: { id: req.params.id } }
  );

  return upd_news;

};

export const updNewsImg = async (body: NewsType, next: NextFunction, req: Request) => {

    const filenames = req.files! as Array<Express.Multer.File>;
    const img = filenames.map((file) => file.filename);

    const new_image: any = [];

    img.map((value) => {
      new_image.push(value);
    });

    const main_img = new_image.toString();
    await News.update(
      { image: Sequelize.fn("array_append", Sequelize.col("image"), main_img) },
      { where: { id: req.params.id } }
    );

};

export const readSingleNews = async (next: NextFunction, req: Request) => {

  const single_news = await News.findOne({ where: { id: req.params.id } });
  return single_news;

};

export const fetchNewsActive = async (next: NextFunction, req: Request) => {

    const { page, size } = req.query;

    const { limit, offset } = getPagination(page, size);
    const news = await News.findAndCountAll({
      where: { status: "active" },
      limit,
      offset,
      order: [
        ["createdAt", "ASC"]
      ]
    });
    const result = getPagingData(news, page, limit);
    const array: any = [];
    result?.result.map((value: any) => {
      function limit (string = '', limit = 0) {
        return string.substring(0, limit)
      }

      const fetch = limit(value?.news, 200);
      array.push
        ({
          id: value?.id,
          news: fetch,
          image: value?.image && value?.image[0],
          title: value?.title.toUpperCase(),
          createdAt: value?.createdAt,
          status: value?.status
        })
      });

    return {array, result};

};

export const fetchNewsLimit = async (next: NextFunction, req: Request) => {

    const news = await News.findAll(
      { where: { status: "active" }}
    );

    // news = news.sort((a: any, b: any) => b.id - a.id)
    for (let i = 1; i < news.length; i++) {
      for (let j = i; j > 0; j--) {
        const _t1: any = news[j];
        const _t0: any = news[j - 1];

        if (new Date(_t1.createdAt).getTime() > new Date(_t0.createdAt).getTime()) {
          news[j] = _t0;
          news[j - 1] = _t1;

          // console.log('sorted')
        } else {
          // console.log('no sorted')
        }
      }
    }

    const array: any = [];

    news?.map((value: any) => {
      function limit (string = '', limit = 0) {
        return string.substring(0, limit)
      }

      const fetch = limit(value.news, 160);
      if(array.length < 2){
        array.push
        ({id: value.id,
          news: fetch, image:value.image,
          title: value.title,
          createdAt: value.createdAt,
          status: value.status
        })
      }
    })

    return { array };

};

export const fetchNewsAll = async (next: NextFunction, req: Request) => {
  try {
    const { q } = req.query;
    const keys = ["title"];
    const search = (data: any) => {
      return data.filter((item: any) => keys.some((key) => item[key].toLowerCase().includes(q)));
    };
    const biz = await News?.findAll({
        where: {
          status: {
            [Op.or]: ["pending", "active"]
          }
        }
      }
    );

    for (let i = 1; i < biz.length; i++) {
      for (let j = i; j > 0; j--) {
        const _t1: any = biz[j];
        const _t0: any = biz[j - 1];

        if (new Date(_t1.createdAt).getTime() > new Date(_t0.createdAt).getTime()) {
          biz[j] = _t0;
          biz[j - 1] = _t1;

          // console.log('sorted')
        } else {
          // console.log('no sorted')
        }
      }
    }

    const result = q ? search(biz) : biz;

    const array: any = [];

    result?.map((value: any) => {
      function limit (string = '', limit = 0) {
        return string.substring(0, limit)
      }

      const fetch = limit(value.news, 187);
      array.push
        ({id: value.id,
          news: fetch, image:value.image,
          title: value.title,
          createdAt: value.createdAt,
          status: value.status
        })
    })


    return { result, array };
  } catch (e: any) {
    return next(new AppError(e, BAD_REQUEST));
  }
};

export const delNews = async (next: NextFunction, req: Request) => {

    const fetch = await News.findOne({ where: { id: req.params.id } });
    const img = fs.readdirSync(resolve(__dirname, "../../../uploads"));
    img.map((value) => {
      if(fetch?.dataValues.image !== null){
        if (fetch?.dataValues.image.includes(value)) {
          fs.unlinkSync(resolve(__dirname, `../../../uploads/${value}`));
        }
      }
    });

    await News.destroy({ where: { id: req.params.id } });

};

export const delete_single_image = async (req: Request) => {

    const rmv = req.params.id; // front end will give me the name of the image

    await News.update(
      { image: Sequelize.fn("array_remove", Sequelize.col("image"), rmv) },
      // { where: { id: req.params.id } },
      { where: {
        status: {
          [Op.or]: ["pending", "active"]
        }
      }}
    );

    const files = fs.readdirSync(resolve(__dirname, '../../../uploads'));
    files.map((value) => {
      if(value === rmv){
        fs.unlinkSync(resolve(__dirname, `../../../uploads/${value}`));
      }
    });

};

export const updValid = async (next: NextFunction, req: Request) => {

    const activate = "active";
    const deactivate = "pending";

    const fetch = await News.findByPk(req.params.id)
    if(fetch?.dataValues.status === 'pending'){
      await News?.update(
        {
          status: activate,
        },
        { where: { id: req.params.id } }
      );
    } else {
      await News?.update(
        {
          status: deactivate,
        },
        { where: { id: req.params.id } }
      );
    }

};
