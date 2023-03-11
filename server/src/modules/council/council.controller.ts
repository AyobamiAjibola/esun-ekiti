import { NextFunction, Request, Response } from "express";
import { BAD_REQUEST, OK, RESOURCE_CREATED } from "../../constants/response-codes";
import AppError from "../../utils/appError";
import * as councilValidator from "./council.validators";
import * as councilServices from "./council.services";

// -----------------------OBAS----------------------------//

//= =================== NEW OBA ==================//
const new_oba = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validate = councilValidator.postOba(req.body);
    if (validate.error) {
      return next(new AppError(validate.error.message, BAD_REQUEST));
    }

    const newObas = await councilServices.newOba(next, req);

    newObas &&
      res.status(RESOURCE_CREATED).json({
        status: "success",
        message: "Oba created successfully",
        data: { newObas },
      });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

//= =================== UPDATE OBA ==================//
const upd_oba = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validate = councilValidator.updOba(req.body);
    if (validate.error) {
      return next(new AppError(validate.error.message, BAD_REQUEST));
    }

    await councilServices.updOba(next, req);

    return res.status(OK).json({
      status: "success",
      message: "Oba updated successfully",
      data: null,
    });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

//= =================== FETCH SINGLE OBA ==================//
const single_oba = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const singleOba = await councilServices.readSingleOba(next, req);
    return res.status(OK).json({
      status: "success",
      message: "Fetch successful",
      data: { singleOba }
    });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

//= =================== FETCH OBAS ==================//
const fetch_oba = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const resource = await councilServices.fetchObas(next, req);
    const info = resource?.result;
    const bio = resource?.array
    return res.status(OK).json({
      status: "success",
      message: "Fetch successful",
      result: { info, bio }
    });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

const delete_oba = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await councilServices.delOba(next, req);
    return res.status(OK).json({
      status: "success",
      message: "Oba successfully deleted",
      data: null,
    });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

// -----------------------OLORI----------------------------//

//= =================== NEW OLORI ==================//
const new_olori = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validate = councilValidator.postOlori(req.body);
    if (validate.error) {
      return next(new AppError(validate.error.message, BAD_REQUEST));
    }

    const newOlori = await councilServices.newOlori(next, req);

    newOlori &&
      res.status(RESOURCE_CREATED).json({
        status: "success",
        message: "Olori created successfully",
        data: { newOlori },
      });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

//= =================== UPDATE OBA ==================//
const upd_olori = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validate = councilValidator.updOlori(req.body);
    if (validate.error) {
      return next(new AppError(validate.error.message, BAD_REQUEST));
    }

    await councilServices.updOlori(next, req);

    return res.status(OK).json({
      status: "success",
      message: "Olori updated successfully",
      data: null,
    });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

//= =================== FETCH OBAS ==================//
const fetch_olori = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await councilServices.fetchOlori(next, req);
    return res.status(OK).json({
      status: "success",
      message: "Fetch successful",
      result
    });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

const delete_olori = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await councilServices.delOlori(next, req);
    return res.status(OK).json({
      status: "success",
      message: "Olori successfully deleted",
      data: null,
    });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

// -----------------------CHIEFS----------------------------//

//= =================== NEW OBA ==================//
const new_chief = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validate = councilValidator.postChief(req.body);
    if (validate.error) {
      return next(new AppError(validate.error.message, BAD_REQUEST));
    }

    const new_biz = await councilServices.newChief(next, req);

    new_biz &&
      res.status(RESOURCE_CREATED).json({
        status: "success",
        message: "Chief created successfully",
        data: { new_biz },
      });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

//= =================== UPDATE CHIEF ==================//
const upd_chief = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validate = councilValidator.updChief(req.body);
    if (validate.error) {
      return next(new AppError(validate.error.message, BAD_REQUEST));
    }

    await councilServices.updChief(next, req);

    return res.status(OK).json({
      status: "success",
      message: "Chief updated successfully",
      data: null,
    });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

const upd_chief_img = async (req: Request, res: Response, next: NextFunction) => {
  try {

    await councilServices.updChiefImg(next, req);

    return res.status(OK).json({
      status: "success",
      message: "Chief updated successfully",
      data: null,
    });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

//= =================== FETCH SINGLE CHIEF ==================//
const single_chief = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const singleChief = await councilServices.readSingleChief(next, req);
    return res.status(OK).json({
      status: "success",
      message: "Fetch successful",
      data: { singleChief },
    });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

//= =================== FETCH CHIEFS ==================//
const fetch_chief = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await councilServices.fetchChiefs(next, req);
    return res.status(OK).json({
    result
    });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

const fetch_chief_admin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await councilServices.fetchChiefsAdmin(next, req);
    return res.status(OK).json({
      status: "success",
      message: "Fetch successful",
      result,
    });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

//= =================== DELETE CHIEFS ==================//
const delete_chief = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await councilServices.delChief(next, req);
    return res.status(OK).json({
      status: "success",
      message: "Chief successfully deleted",
      data: null,
    });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

// -----------------------PAST OBAS----------------------------//

//= =================== NEW PAST OBA ==================//
const new_past_oba = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validate = councilValidator.postPastOba(req.body);
    if (validate.error) {
      return next(new AppError(validate.error.message, BAD_REQUEST));
    }

    const new_pastOba = await councilServices.newPastOba(next, req);

    new_pastOba &&
      res.status(RESOURCE_CREATED).json({
        status: "success",
        message: "Oba created successfully",
        data: { new_pastOba },
      });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

//= =================== UPDATE PAST OBA ==================//
const upd_past_oba = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validate = councilValidator.updPastOba(req.body);
    if (validate.error) {
      return next(new AppError(validate.error.message, BAD_REQUEST));
    }

    await councilServices.updPastOba(next, req);

    return res.status(OK).json({
      status: "success",
      message: "Oba updated successfully",
      data: null,
    });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

//= =================== FETCH SINGLE PAST OBA ==================//
const single_past_oba = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const singlePastOba = await councilServices.readSinglePastOba(next, req);
    return res.status(OK).json({
      status: "success",
      message: "Fetch successful",
      data: { singlePastOba },
    });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

//= =================== FETCH PAST OBAS ==================//
const fetch_past_oba = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await councilServices.fetchPastObas(next, req);
    return res.status(OK).json({
      status: "success",
      message: "Fetch successful",
      result,
    });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

const fetch_past_oba_admin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await councilServices.fetchPastObaAdmin(next, req);
    return res.status(OK).json({
      status: "success",
      message: "Fetch successful",
      result
    });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

//= =================== DELETE PAST OBAS ==================//
const delete_past_oba = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await councilServices.delPastOba(next, req);
    return res.status(OK).json({
      status: "success",
      message: "Oba successfully deleted",
      data: null,
    });
  } catch (error: any) {
    return next(new AppError(error.message, BAD_REQUEST));
  }
};

export default {
  new_oba,
  upd_oba,
  single_oba,
  fetch_oba,
  delete_oba,
  new_olori,
  upd_olori,
  fetch_olori,
  delete_olori,
  new_chief,
  upd_chief,
  single_chief,
  fetch_chief,
  delete_chief,
  new_past_oba,
  upd_past_oba,
  single_past_oba,
  fetch_past_oba,
  delete_past_oba,
  upd_chief_img,
  fetch_past_oba_admin,
  fetch_chief_admin
};
