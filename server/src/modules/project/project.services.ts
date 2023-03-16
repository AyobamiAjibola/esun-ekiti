import { NextFunction, Request } from "express";
import fs from "fs";
import { resolve } from "path";
import { BAD_REQUEST } from "../../constants/response-codes";
import AppError from "../../utils/appError";
import { ProjectType } from "./project.types";
import { Op, Sequelize } from "sequelize";
import { getPagination, getPagingData } from "../../helpers/Pagination";
const db = require('../../sequelize/models').default;

const { sequelize } = db;
const { Project } = db;

export const newProject = async (body: ProjectType, next: NextFunction, req: Request) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    const new_project = await Project?.create({
      ...req.body
    });
    await transaction.commit();

    return new_project;
  } catch (e: any) {
    if (transaction) {
      await transaction.rollback();
    }
    return next(new AppError(e, BAD_REQUEST));
  }
};

export const updProject = async (body: ProjectType, next: NextFunction, req: Request) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    const upd_project = await Project?.update(
      {
        ...req.body
      },
      { where: { id: req.params.id } },
      { transaction }
    );
    await transaction.commit();

    return upd_project;
  } catch (e: any) {
    if (transaction) {
      await transaction.rollback();
    }
    return next(new AppError(e, BAD_REQUEST));
  }
};

export const updProjectImg = async (body: ProjectType, next: NextFunction, req: Request) => {
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
      await Project?.update(
        { image: Sequelize.fn("array_append", Sequelize.col("image"), main_img) },
        { where: { id: req.params.id } },
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

export const readSingleProject = async (next: NextFunction, req: Request) => {
  try {
    const single_project = await Project?.findOne({ where: { id: req.params.id } });
    return single_project;
  } catch (e: any) {
    return next(new AppError(e, BAD_REQUEST));
  }
};

export const fetchProject = async (next: NextFunction, req: Request) => {
  try {
    const { q } = req.query;
    const keys = ["project"];
    const search = (data: any) => {
      return data.filter((item: any) => {
        keys.some((key) => {
        item[key].toLowerCase().includes(q)
      })});
    };
    const biz = await Project?.findAll({
      where: {isProject: "active"},
      limit: 5,
      order: [["createdAt"]],
    });

    const result = q ? search(biz) : biz;
    const array: any = [];

    result?.map((value: any) => {
      function limit (string = '', limit = 0) {
        return string.substring(0, limit)
      }

      const fetch = limit(value.detail, 187);
      array.push
        ({
          id: value.id,
          detail: fetch,
          image:value.image,
          project: value.project
          // date_commissioned: value.date_commissioned.toLocaleString('en-US')
        })
    })
    return { result, array };
  } catch (e: any) {
    return next(new AppError(e, BAD_REQUEST));
  }
};

export const fetchProjectClient = async (next: NextFunction, req: Request) => {
  try {
    const { page, size } = req.query;

    const { limit, offset } = getPagination(page, size);
    const news = await Project?.findAndCountAll({
      where: { isProject: "active" },
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

      const fetch = limit(value?.detail, 187);
      array.push
        ({
          id: value?.id,
          detail: fetch,
          image: value?.image && value?.image[0],
          project: value?.project.toUpperCase()
        })
    })
    return { result, array };
  } catch (e: any) {
    return next(new AppError(e, BAD_REQUEST));
  }
};

export const fetchProjectLimit = async (next: NextFunction, req: Request) => {
  try {
    const project = await Project?.findAll(
      {where: {isProject: "active"}},
      {
        order: [["createdAt", "ASC"]]
      },
    );

    const array: any = [];

    project?.map((value: any) => {
      function limit (string = '', limit = 0) {
        return string.substring(0, limit)
      }

      const fetch = limit(value.detail, 100);
      const newPro = limit(value.project, 18);
      if(array.length < 3){
        array.push
          ({
            id: value.id,
            detail: fetch,
            image: value.image,
            project: newPro.toUpperCase()
            // date_commissioned: value.date_commissioned.toLocaleString('en-US')
          })
      }
    })

    return { array };
  } catch (e: any) {
    return next(new AppError(e, BAD_REQUEST));
  }
};

export const delProject = async (next: NextFunction, req: Request) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    const fetch = await Project?.findOne({ where: { id: req.params.id } }, { transaction });
    const img = fs.readdirSync(resolve(__dirname, "../../../uploads"));
    img.map((value) => {
      if(fetch.dataValues.image !== null){
        if (fetch.dataValues.image.includes(value)) {
          fs.unlinkSync(resolve(__dirname, `../../../uploads/${value}`));
        }
      }
    });

    const del = await Project?.destroy({ where: { id: req.params.id } });
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
    const rmv = req.params.id;

    await Project?.update(
      { image: Sequelize.fn("array_remove", Sequelize.col("image"), rmv) },
      { where: { isProject: "active" } },
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
