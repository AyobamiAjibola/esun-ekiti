import { NextFunction, Request } from "express";
import fs from "fs";
import { resolve } from "path";
import { BAD_REQUEST, FORBIDDEN } from "../../constants/response-codes";
import AppError from "../../utils/appError";
import { getPagination, getPagingData } from "../../helpers/Pagination";

import Oba from "../../models/Oba";
import Olori from "../../models/Olori";
import Chief from "../../models/Chief";
import PastOba from "../../models/PastOba";

//= =========== OBA =====================//
export const newOba = async (next: NextFunction, req: Request) => {

  const fetch = await Oba.findOne({where: {oba: 'elesun'}});
  if(fetch) return next(new AppError("An Oba already exist", FORBIDDEN))

  const image = req.file ? req.file.filename : "";
  const new_oba = await Oba.create({
    ...req.body,
    image
  });

  return new_oba;

};

export const updOba = async (next: NextFunction, req: Request) => {

  const image = req.file && req.file.filename;

  if (image) {
    const fetch = await Oba.findOne({ where: { oba: "elesun" } });
    const img = fs.readdirSync(resolve(__dirname, "../../../uploads"));
    img.map((value) => {
      if (fetch?.dataValues.image.includes(value)) {
        fs.unlinkSync(resolve(__dirname, `../../../uploads/${value}`));
      }
    });
  }
  const new_oba = await Oba?.update(
    {
      ...req.body,
      image,
    },
    { where: { oba: "elesun" } }
  );

  return new_oba;

};

export const readSingleOba = async (next: NextFunction, req: Request) => {

  const single_oba = await Oba.findOne({ where: { id: req.params.id } });
  return single_oba;

};

export const fetchObas = async (next: NextFunction, req: Request) => {

  const result = await Oba.findOne({ where: { oba: 'elesun' } });

    function limit (string = '', limit = 0) {
      return string.substring(0, limit)
    }

    const array = limit(result?.dataValues.bio, 400);
  return { result, array };

};

export const delOba = async (next: NextFunction, req: Request) => {

    const fetch = await Oba.findOne({ where: { oba: 'elesun' } });
    const img = fs.readdirSync(resolve(__dirname, "../../../uploads"));
    img.map((value) => {
      if(fetch?.dataValues.image !== null){
        if (fetch?.dataValues.image.includes(value)) {
          fs.unlinkSync(resolve(__dirname, `../../../uploads/${value}`));
        }
      }
    });

    const fetchOlori = await Olori.findOne({ where: { olori: 'elesun' } });
    const photo = fs.readdirSync(resolve(__dirname, "../../../uploads"));
    fetchOlori && photo.map((value) => {
      if (fetchOlori?.dataValues.image.includes(value)) {
        fs.unlinkSync(resolve(__dirname, `../../../uploads/${value}`));
      }
    });

    await Oba.destroy({ where: { oba: 'elesun' } });
    await Olori.destroy({ where: { olori: 'elesun' } });

};

//=================OLORI========================//
export const newOlori = async (next: NextFunction, req: Request) => {

    const fetchOba = await Oba.findOne({where: {oba: 'elesun'}});
    if(!fetchOba) return next(new AppError("Oba record not found. Create oba record", FORBIDDEN))

    const fetch = await Olori.findOne({where: {olori: 'elesun'}});
    if(fetch) return next(new AppError("An Olori already exist", FORBIDDEN))

    const image = req.file ? req.file.filename : "";
    const new_olori = await Olori?.create({
      ...req.body,
      image,
    });

    return new_olori;

};

export const updOlori = async (next: NextFunction, req: Request) => {

    const image = req.file && req.file.filename;

    if (image) {
      const fetch = await Olori.findOne({ where: { olori: "elesun" } });
      const img = fs.readdirSync(resolve(__dirname, "../../../uploads"));
      img.map((value) => {
        if (fetch?.dataValues.image.includes(value)) {
          fs.unlinkSync(resolve(__dirname, `../../../uploads/${value}`));
        }
      });
    }
    const new_olori = await Olori.update(
      {
        ...req.body,
        image,
      },
      { where: { olori: "elesun" } }
    );

    return new_olori;

};

export const fetchOlori = async (next: NextFunction, req: Request) => {

    const biz = await Olori.findOne({ where: { olori: 'elesun' } });

    const result = biz;
    return result;

};

export const delOlori = async (next: NextFunction, req: Request) => {

  const fetch = await Olori.findOne({ where: { olori: 'elesun' } });
  const img = fs.readdirSync(resolve(__dirname, "../../../uploads"));
  img.map((value) => {
    if(fetch?.dataValues.image !== null){
      if (fetch?.dataValues.image.includes(value)) {
        fs.unlinkSync(resolve(__dirname, `../../../uploads/${value}`));
      }
    }
  });

  await Olori.destroy({ where: { olori: 'elesun' } });

};

//= ============= CHIEFS ==========================//
export const newChief = async (next: NextFunction, req: Request) => {

  const { title, position } = req.body;
  const chief = await Chief.findOne({ where: { title } });

  if (chief) {
    return next(new AppError("Title already in use", BAD_REQUEST));
  }

  const pos = await Chief.findOne({ where: { position } });
  if (pos) {
    return next(new AppError("A chief with this position already exist", BAD_REQUEST));
  }

  if (position < 1) {
    return next(new AppError("Negative values or zeros are not allowed in position", BAD_REQUEST));
  }

  const new_chief = await Chief?.create({
    ...req.body
  });

  return new_chief;

};

export const updChief = async (next: NextFunction, req: Request) => {

  const { title, position } = req.body;
  const chief = await Chief.findOne({ where: { title } });
  const fetch = await Chief.findOne({ where: { title: req.params.id } });
  if (chief) {
    if(chief && chief?.dataValues.title !== fetch?.dataValues.title)
    return next(new AppError("Title already in use", BAD_REQUEST));
  }

  const fetchD = await Chief.findOne({where: {title: req.params.id}});
  if (title) {
    const chiefTitle = await Chief.findOne({ where: { title } });
    if (chiefTitle && chiefTitle.dataValues.title !== fetchD?.dataValues.title) {
      return next(new AppError("A chief with this title already exist", BAD_REQUEST));
    }
  }

  const fetchPos = await Chief.findOne({where: {title: req.params.id}});
  if (title) {
    const chiefPos = await Chief.findOne({ where: { position } });
    if (chiefPos && chiefPos.dataValues.position !== fetchPos?.dataValues.position) {
      return next(new AppError("A chief with this position already exist", BAD_REQUEST));
    }
  }
  if (position < 1) {
    return next(new AppError("Negative values or zeros are not allowed in position", BAD_REQUEST));
  }

  const new_chief = await Chief.update(
    {
      ...req.body
    },
    { where: { title: req.params.id } }
  );

  return new_chief;

};

export const updChiefImg = async (next: NextFunction, req: Request) => {

  const image = req.file && req.file.filename;
  if (image) {
    const fetch = await Chief.findOne({ where: { title: req.params.id } });
    const img = fs.readdirSync(resolve(__dirname, "../../../uploads"));
    img.map((value) => {
      if (fetch?.dataValues.image) {
        if (fetch?.dataValues.image.includes(value)) {
          fs.unlinkSync(resolve(__dirname, `../../../uploads/${value}`));
        }
      }
    });
  }

  const new_chief = await Chief.update(
    {
      image
    },
    { where: { title: req.params.id } }
  );

  return new_chief;

};

export const readSingleChief = async (next: NextFunction, req: Request) => {

  const single_Chief = await Chief.findOne({ where: { title: req.params.id } });
  return single_Chief;

};

export const fetchChiefs = async (next: NextFunction, req: Request) => {

  const pageAsNumber = Number.parseInt(req.query.page as string);
  const sizeAsNumber = Number.parseInt(req.query.size as string);

  let page = 0;
  if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber
  }

  let size = 0;
  if(!Number.isNaN(sizeAsNumber) && sizeAsNumber === 5) {
    size = sizeAsNumber
  }

  const { limit, offset } = getPagination(page, size);
  const chiefs = await Chief.findAndCountAll({
    limit,
    offset,
    order: [
      ["position", "ASC"]
    ],
  });

  const response = getPagingData(chiefs, page, limit)
  return response;

};

export const fetchChiefsAdmin = async (next: NextFunction, req: Request) => {

  const chiefs = await Chief.findAll({
    order: [
      ["position", "ASC"]
    ],
  });

  return chiefs;

};

export const delChief = async (next: NextFunction, req: Request) => {

  const fetch = await Chief.findOne({ where: { title: req.params.id } });
  const img = fs.readdirSync(resolve(__dirname, "../../../uploads"));
  img.map((value) => {
    if(fetch?.dataValues.image !== null){
      if (fetch?.dataValues.image.includes(value)) {
        fs.unlinkSync(resolve(__dirname, `../../../uploads/${value}`));
      }
    }
  });
  await Chief.destroy({ where: { title: req.params.id } });

};


//= =========== PAST OBA =====================//
export const newPastOba = async (next: NextFunction, req: Request) => {

  const { position } = req.body;
  const pos = await PastOba.findOne({ where: { position } });
  if (pos) {
    return next(new AppError("Oba with this position already exist", BAD_REQUEST));
  }

  if (position < 1) {
    return next(new AppError("Negative values or zeros are not allowed in position", BAD_REQUEST));
  }

  const new_past_oba = await PastOba.create({ ...req.body });

  return new_past_oba;

};

export const updPastOba = async (next: NextFunction, req: Request) => {

  const new_past_oba = await PastOba.update(
    req.body,
    { where: { id: req.params.id } }
  );

  return new_past_oba;

};

export const readSinglePastOba = async (next: NextFunction, req: Request) => {

  const single_past_oba = await PastOba.findOne({ where: { id: req.params.id } });
  return single_past_oba;

};

export const fetchPastObas = async (next: NextFunction, req: Request) => {

  const pageAsNumber = Number.parseInt(req.query.page as string);
  const sizeAsNumber = Number.parseInt(req.query.size as string);

  let page = 0;
  if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber
  }

  let size = 0;
  if(!Number.isNaN(sizeAsNumber) && sizeAsNumber === 2) {
    size = sizeAsNumber
  }

  const { limit, offset } = getPagination(page, size);
  const pastOba = await PastOba.findAndCountAll({
    limit,
    offset,
    order: [
      ["createdAt", "ASC"]
    ],
  });

  const response = getPagingData(pastOba, page, limit)
  return response;

};

export const fetchPastObaAdmin = async (next: NextFunction, req: Request) => {

  const pastOba = await PastOba.findAll({
    order: [
      ["position", "ASC"]
    ],
  });

  return pastOba

};

export const delPastOba = async (next: NextFunction, req: Request) => {

  await PastOba.destroy({ where: { id: req.params.id } });

};
