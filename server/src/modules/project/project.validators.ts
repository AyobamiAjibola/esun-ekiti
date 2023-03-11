import Joi from "joi";

export const postProject = (data: any): Joi.ValidationResult => {
  const schema = Joi.object().keys({
    project: Joi.string().required(),
    // date_commissioned: Joi.any(),
    detail: Joi.string().required()
  });
  return schema.validate(data);
};

export const updProject = (data: any): Joi.ValidationResult => {
  const schema = Joi.object().keys({
    project: Joi.string(),
    // date_commissioned: Joi.any(),
    detail: Joi.string(),
  });
  return schema.validate(data);
};
