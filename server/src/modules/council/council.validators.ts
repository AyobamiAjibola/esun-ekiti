import Joi from "joi";

export const postOba = (data: any): Joi.ValidationResult => {
  const schema = Joi.object().keys({
    fullName: Joi.string().required(),
    bio: Joi.string().required(),
    from: Joi.string().required(),
    to: Joi.string().required(),
    image: Joi.any()
  });
  return schema.validate(data);
};

export const updOba = (data: any): Joi.ValidationResult => {
  const schema = Joi.object().keys({
    fullName: Joi.string(),
    bio: Joi.string(),
    from: Joi.string(),
    to: Joi.string(),
    image: Joi.any()
  });
  return schema.validate(data);
};

export const postChief = (data: any): Joi.ValidationResult => {
  const schema = Joi.object().keys({
    fullName: Joi.string().required(),
    title: Joi.string().required(),
    bio: Joi.string(),
    // duties: Joi.string().optional().allow("").allow(null).allow(null),
    image: Joi.any(),
    position: Joi.number().required()
  });
  return schema.validate(data);
};

export const updChief = (data: any): Joi.ValidationResult => {
  const schema = Joi.object().keys({
    fullName: Joi.string(),
    title: Joi.string(),
    // duties: Joi.string().optional().allow(""),
    image: Joi.any(),
    position: Joi.number()
  });
  return schema.validate(data);
};

export const postPastOba = (data: any): Joi.ValidationResult => {
  const schema = Joi.object().keys({
    fullName: Joi.string().required(),
    from: Joi.string().required(),
    to: Joi.string().required(),
    position: Joi.number().required()
  });
  return schema.validate(data);
};

export const updPastOba = (data: any): Joi.ValidationResult => {
  const schema = Joi.object().keys({
    fullName: Joi.string(),
    from: Joi.string(),
    to: Joi.string()
  });
  return schema.validate(data);
};

export const postOlori = (data: any): Joi.ValidationResult => {
  const schema = Joi.object().keys({
    fullName: Joi.string().required(),
    image: Joi.any()
  });
  return schema.validate(data);
};

export const updOlori = (data: any): Joi.ValidationResult => {
  const schema = Joi.object().keys({
    fullName: Joi.string(),
    image: Joi.any()
  });
  return schema.validate(data);
};
