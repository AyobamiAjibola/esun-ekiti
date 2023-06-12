import { NextFunction, Request } from "express";
import fs from "fs";
import { resolve } from "path";
import { BAD_REQUEST } from "../../constants/response-codes";
import AppError from "../../utils/appError";
import { ProjectType } from "./project.types";
import { Op, Sequelize } from "sequelize";
import { getPagination, getPagingData } from "../../helpers/Pagination";
import Project from "../../models/Project";
import CommentProject from "../../models/CommentProject";
import Reply from "../../models/Reply";

export const newProject = async (body: ProjectType, next: NextFunction, req: Request) => {

    const new_project = await Project.create({
      ...req.body
    });

    return new_project;

};

export const updProject = async (body: ProjectType, next: NextFunction, req: Request) => {

    const upd_project = await Project.update(
      {
        ...req.body
      },
      { where: { id: req.params.id } }
    );

    return upd_project;

};

export const updProjectImg = async (body: ProjectType, next: NextFunction, req: Request) => {

      const filenames = req.files! as Array<Express.Multer.File>;
      const img = filenames.map((file) => file.filename);

      const new_image: any = [];

      img.map((value) => {
        new_image.push(value);
      });

      const main_img = new_image.toString();
      await Project.update(
        { image: Sequelize.fn("array_append", Sequelize.col("image"), main_img) },
        { where: { id: req.params.id } }
      );



};

export const readSingleProject = async (next: NextFunction, req: Request) => {

  const single_project = await Project.findOne({
    where: { id: req.params.id },
    include: [
      {model: CommentProject, include: [ Reply ]}
    ]
  });
  return single_project;

};

export const fetchProject = async (next: NextFunction, req: Request) => {

    const { q } = req.query;
    const keys = ["project"];
    const search = (data: any) => {
      return data.filter((item: any) => {
        keys.some((key) => {
        item[key].toLowerCase().includes(q)
      })});
    };
    const biz = await Project.findAll({
      where: {isProject: "active"},
      limit: 5,
      include: [
        {model: CommentProject, include: [ Reply ]}
      ]
    });

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

};

export const fetchProjectClient = async (next: NextFunction, req: Request) => {

    const { page, size } = req.query;

    const { limit, offset } = getPagination(page, size);
    const news = await Project.findAndCountAll({
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

};

export const fetchProjectLimit = async (next: NextFunction, req: Request) => {

    const project = await Project.findAll(
      {where: {isProject: "active"}}
    );

    for (let i = 1; i < project.length; i++) {
      for (let j = i; j > 0; j--) {
        const _t1: any = project[j];
        const _t0: any = project[j - 1];

        if (new Date(_t1.createdAt).getTime() > new Date(_t0.createdAt).getTime()) {
          project[j] = _t0;
          project[j - 1] = _t1;

          // console.log('sorted')
        } else {
          // console.log('no sorted')
        }
      }
    }

    const array: any = [];

    project.map((value: any) => {
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

};

export const delProject = async (next: NextFunction, req: Request) => {

    const fetch = await Project.findOne({ where: { id: req.params.id } }, );
    const img = fs.readdirSync(resolve(__dirname, "../../../uploads"));
    img.map((value) => {
      if(fetch?.dataValues.image !== null){
        if (fetch?.dataValues.image.includes(value)) {
          fs.unlinkSync(resolve(__dirname, `../../../uploads/${value}`));
        }
      }
    });

    const del = await Project?.destroy({ where: { id: req.params.id } });
    return del;

};

export const delete_single_image = async (req: Request) => {
    const rmv = req.params.id;

    await Project.update(
      { image: Sequelize.fn("array_remove", Sequelize.col("image"), rmv) },
      { where: { isProject: "active" } }
    );

    const files = fs.readdirSync(resolve(__dirname, '../../../uploads'));
    files.map((value) => {
      if(value === rmv){
        fs.unlinkSync(resolve(__dirname, `../../../uploads/${value}`));
      }
    });

};
