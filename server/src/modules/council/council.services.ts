import { NextFunction, Request } from "express";
import fs from "fs";
import { resolve } from "path";
import { BAD_REQUEST, FORBIDDEN } from "../../constants/response-codes";
import AppError from "../../utils/appError";
import { getPagination, getPagingData } from "../../helpers/Pagination";
const db = require('../../sequelize/models').default;


const { sequelize } = db;
const { Oba } = db;
const { Olori } = db;
const { Chief } = db;
const { PastOba } = db;

//= =========== OBA =====================//
export const newOba = async (next: NextFunction, req: Request) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    const fetch = await Oba?.findOne({where: {oba: 'elesun'}});
    if(fetch) return next(new AppError("An Oba already exist", FORBIDDEN))

    const image = req.file ? req.file.filename : "";
    const new_oba = await Oba?.create({
      ...req.body,
      image
    });
    await transaction.commit();

    return new_oba;
  } catch (e: any) {
    if (transaction) {
      await transaction.rollback();
    }
    return next(new AppError(e, BAD_REQUEST));
  }
};

export const updOba = async (next: NextFunction, req: Request) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    const image = req.file && req.file.filename;

    if (image) {
      const fetch = await Oba?.findOne({ where: { oba: "elesun" } }, { transaction });
      const img = fs.readdirSync(resolve(__dirname, "../../../uploads"));
      img.map((value) => {
        if (fetch.dataValues.image.includes(value)) {
          fs.unlinkSync(resolve(__dirname, `../../../uploads/${value}`));
        }
      });
    }
    const new_oba = await Oba?.update(
      {
        ...req.body,
        image,
      },
      { where: { oba: "elesun" } },
      { transaction }
    );
    await transaction.commit();

    return new_oba;
  } catch (e: any) {
    if (transaction) {
      await transaction.rollback();
    }
    return next(new AppError(e, BAD_REQUEST));
  }
};

export const readSingleOba = async (next: NextFunction, req: Request) => {
  try {
    const single_oba = await Oba?.findOne({ where: { id: req.params.id } });
    return single_oba;
  } catch (e: any) {
    return next(new AppError(e, BAD_REQUEST));
  }
};

export const fetchObas = async (next: NextFunction, req: Request) => {
  try {
    const result = await Oba?.findOne({ where: { oba: 'elesun' } });

      function limit (string = '', limit = 0) {
        return string.substring(0, limit)
      }

      const array = limit(result.dataValues.bio, 400);

    return { result, array };
  } catch (e: any) {
    return next(new AppError(e, BAD_REQUEST));
  }
};

export const delOba = async (next: NextFunction, req: Request) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    const fetch = await Oba?.findOne({ where: { oba: 'elesun' } }, { transaction });
    const img = fs.readdirSync(resolve(__dirname, "../../../uploads"));
    img.map((value) => {
      if(fetch.dataValues.image !== null){
        if (fetch.dataValues.image.includes(value)) {
          fs.unlinkSync(resolve(__dirname, `../../../uploads/${value}`));
        }
      }
    });

    const fetchOlori = await Olori?.findOne({ where: { olori: 'elesun' } }, { transaction });
    const photo = fs.readdirSync(resolve(__dirname, "../../../uploads"));
    fetchOlori && photo.map((value) => {
      if (fetchOlori?.dataValues.image.includes(value)) {
        fs.unlinkSync(resolve(__dirname, `../../../uploads/${value}`));
      }
    });
    await Oba?.destroy({ where: { oba: 'elesun' } }, { transaction });
    await Olori?.destroy({ where: { olori: 'elesun' } }, { transaction });
    await transaction.commit();
  } catch (e: any) {
    if (transaction) {
      await transaction.rollback();
    }
    return next(new AppError(e, BAD_REQUEST));
  }
};

//=================OLORI========================//
export const newOlori = async (next: NextFunction, req: Request) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    const fetchOba = await Oba?.findOne({where: {oba: 'elesun'}});
    if(!fetchOba) return next(new AppError("Oba record not found. Create oba record", FORBIDDEN))

    const fetch = await Olori?.findOne({where: {olori: 'elesun'}});
    if(fetch) return next(new AppError("An Olori already exist", FORBIDDEN))

    const image = req.file ? req.file.filename : "";
    const new_olori = await Olori?.create({
      ...req.body,
      image,
    });
    await transaction.commit();

    return new_olori;
  } catch (e: any) {
    if (transaction) {
      await transaction.rollback();
    }
    return next(new AppError(e, BAD_REQUEST));
  }
};

export const updOlori = async (next: NextFunction, req: Request) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    const image = req.file && req.file.filename;

    if (image) {
      const fetch = await Olori?.findOne({ where: { olori: "elesun" } }, { transaction });
      const img = fs.readdirSync(resolve(__dirname, "../../../uploads"));
      img.map((value) => {
        if (fetch.dataValues.image.includes(value)) {
          fs.unlinkSync(resolve(__dirname, `../../../uploads/${value}`));
        }
      });
    }
    const new_olori = await Olori?.update(
      {
        ...req.body,
        image,
      },
      { where: { olori: "elesun" } },
      { transaction }
    );
    await transaction.commit();

    return new_olori;
  } catch (e: any) {
    if (transaction) {
      await transaction.rollback();
    }
    return next(new AppError(e, BAD_REQUEST));
  }
};

export const fetchOlori = async (next: NextFunction, req: Request) => {
  try {
    const biz = await Olori?.findOne({ where: { olori: 'elesun' } });

    const result = biz;
    return result;
  } catch (e: any) {
    return next(new AppError(e, BAD_REQUEST));
  }
};

export const delOlori = async (next: NextFunction, req: Request) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    const fetch = await Olori?.findOne({ where: { olori: 'elesun' } }, { transaction });
    const img = fs.readdirSync(resolve(__dirname, "../../../uploads"));
    img.map((value) => {
      if(fetch.dataValues.image !== null){
        if (fetch.dataValues.image.includes(value)) {
          fs.unlinkSync(resolve(__dirname, `../../../uploads/${value}`));
        }
      }
    });
    await Olori?.destroy({ where: { olori: 'elesun' } }, { transaction });
    await transaction.commit();
  } catch (e: any) {
    if (transaction) {
      await transaction.rollback();
    }
    return next(new AppError(e, BAD_REQUEST));
  }
};

//= ============= CHIEFS ==========================//
export const newChief = async (next: NextFunction, req: Request) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    const { title, position } = req.body;
    const chief = await Chief?.findOne({ where: { title } }, { transaction });

    if (chief) {
      return next(new AppError("Title already in use", BAD_REQUEST));
    }

    const pos = await Chief?.findOne({ where: { position } }, { transaction });
    if (pos) {
      return next(new AppError("A chief with this position already exist", BAD_REQUEST));
    }

    if (position < 1) {
      return next(new AppError("Negative values or zeros are not allowed in position", BAD_REQUEST));
    }

    const new_chief = await Chief?.create({
      ...req.body
    });
    await transaction.commit();

    return new_chief;
  } catch (e: any) {
    if (transaction) {
      await transaction.rollback();
    }
    return next(new AppError(e, BAD_REQUEST));
  }
};

export const updChief = async (next: NextFunction, req: Request) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    const { title, position } = req.body;
    const chief = await Chief?.findOne({ where: { title } }, { transaction });
    const fetch = await Chief?.findOne({ where: { title: req.params.id } }, { transaction });
    if (chief) {
      if(chief && chief?.dataValues.title !== fetch.dataValues.title)
      return next(new AppError("Title already in use", BAD_REQUEST));
    }

    const fetchD = await Chief?.findOne({where: {title: req.params.id}}, { transaction });
    if (title) {
      const chiefTitle = await Chief?.findOne({ where: { title } }, { transaction });
      if (chiefTitle && chiefTitle.dataValues.title !== fetchD.dataValues.title) {
        return next(new AppError("A chief with this title already exist", BAD_REQUEST));
      }
    }

    const fetchPos = await Chief?.findOne({where: {title: req.params.id}}, { transaction });
    if (title) {
      const chiefPos = await Chief?.findOne({ where: { position } }, { transaction });
      if (chiefPos && chiefPos.dataValues.position !== fetchPos.dataValues.position) {
        return next(new AppError("A chief with this position already exist", BAD_REQUEST));
      }
    }
    if (position < 1) {
      return next(new AppError("Negative values or zeros are not allowed in position", BAD_REQUEST));
    }


    const new_chief = await Chief?.update(
      {
        ...req.body
      },
      { where: { title: req.params.id } },
      { transaction }
    );
    await transaction.commit();

    return new_chief;
  } catch (e: any) {
    if (transaction) {
      await transaction.rollback();
    }
    console.log(e.message)
    // return next(new AppError(e.message, BAD_REQUEST));
  }
};

export const updChiefImg = async (next: NextFunction, req: Request) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    const image = req.file && req.file.filename;
    if (image) {
      const fetch = await Chief?.findOne({ where: { title: req.params.id } }, { transaction });
      const img = fs.readdirSync(resolve(__dirname, "../../../uploads"));
      img.map((value) => {
        if (fetch.dataValues.image) {
          if (fetch.dataValues.image.includes(value)) {
            fs.unlinkSync(resolve(__dirname, `../../../uploads/${value}`));
          }
        }
      });
    }

    const new_chief = await Chief?.update(
      {
        image
      },
      { where: { title: req.params.id } },
      { transaction }
    );
    await transaction.commit();

    return new_chief;
  } catch (e: any) {
    if (transaction) {
      await transaction.rollback();
    }
    console.log(e.message)
    // return next(new AppError(e.message, BAD_REQUEST));
  }
};

export const readSingleChief = async (next: NextFunction, req: Request) => {
  try {
    const single_Chief = await Chief?.findOne({ where: { title: req.params.id } });
    return single_Chief;
  } catch (e: any) {
    return next(new AppError(e, BAD_REQUEST));
  }
};

export const fetchChiefs = async (next: NextFunction, req: Request) => {
  try {
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
    const chiefs = await Chief?.findAndCountAll({
      limit,
      offset,
      order: [
        ["position", "ASC"]
      ],
    });

    const response = getPagingData(chiefs, page, limit)
    return response;
  } catch (e: any) {
    return next(new AppError(e, BAD_REQUEST));
  }
};

export const fetchChiefsAdmin = async (next: NextFunction, req: Request) => {
  try {
    const chiefs = await Chief?.findAll({
      order: [
        ["position", "ASC"]
      ],
    });

    return chiefs;
  } catch (e: any) {
    return next(new AppError(e, BAD_REQUEST));
  }
};

export const delChief = async (next: NextFunction, req: Request) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    const fetch = await Chief?.findOne({ where: { title: req.params.id } }, { transaction });
    const img = fs.readdirSync(resolve(__dirname, "../../../uploads"));
    img.map((value) => {
      if(fetch.dataValues.image !== null){
        if (fetch.dataValues.image.includes(value)) {
          fs.unlinkSync(resolve(__dirname, `../../../uploads/${value}`));
        }
      }
    });
    await Chief?.destroy({ where: { title: req.params.id } }, { transaction });
    await transaction.commit();
  } catch (e: any) {
    if (transaction) {
      await transaction.rollback();
    }
    console.log(e.message)
    // return next(new AppError(e, BAD_REQUEST));
  }
};


//= =========== PAST OBA =====================//
export const newPastOba = async (next: NextFunction, req: Request) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    const { position } = req.body;
    const pos = await PastOba?.findOne({ where: { position } }, { transaction });
    if (pos) {
      return next(new AppError("Oba with this position already exist", BAD_REQUEST));
    }

    if (position < 1) {
      return next(new AppError("Negative values or zeros are not allowed in position", BAD_REQUEST));
    }

    const new_past_oba = await PastOba?.create({ ...req.body });
    await transaction.commit();

    return new_past_oba;
  } catch (e: any) {
    if (transaction) {
      await transaction.rollback();
    }
    return next(new AppError(e, BAD_REQUEST));
  }
};

export const updPastOba = async (next: NextFunction, req: Request) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    const new_past_oba = await PastOba?.update(
      req.body,
      { where: { id: req.params.id } },
      { transaction }
    );
    await transaction.commit();

    return new_past_oba;
  } catch (e: any) {
    if (transaction) {
      await transaction.rollback();
    }
    return next(new AppError(e, BAD_REQUEST));
  }
};

export const readSinglePastOba = async (next: NextFunction, req: Request) => {
  try {
    const single_past_oba = await PastOba?.findOne({ where: { id: req.params.id } });
    return single_past_oba;
  } catch (e: any) {
    return next(new AppError(e, BAD_REQUEST));
  }
};

export const fetchPastObas = async (next: NextFunction, req: Request) => {
  try {
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
    const pastOba = await PastOba?.findAndCountAll({
      limit,
      offset,
      order: [
        ["createdAt", "ASC"]
      ],
    });

    const response = getPagingData(pastOba, page, limit)
    return response;
  } catch (e: any) {
    return next(new AppError(e, BAD_REQUEST));
  }
};

export const fetchPastObaAdmin = async (next: NextFunction, req: Request) => {
  try {
    const pastOba = await PastOba?.findAll({
      order: [
        ["position", "ASC"]
      ],
    });

    return pastOba
  } catch (e: any) {
    return next(new AppError(e, BAD_REQUEST));
  }
};

export const delPastOba = async (next: NextFunction, req: Request) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    await PastOba?.destroy({ where: { id: req.params.id } }, { transaction });
    await transaction.commit();
  } catch (e: any) {
    if (transaction) {
      await transaction.rollback();
    }
    return next(new AppError(e, BAD_REQUEST));
  }
};
