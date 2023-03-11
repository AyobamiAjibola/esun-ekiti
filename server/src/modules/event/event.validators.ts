import Joi from "joi";

export const postEvent = (data: any): Joi.ValidationResult => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    detail: Joi.string().required(),
    image: Joi.any()
  });
  return schema.validate(data);
};

export const updEvent = (data: any): Joi.ValidationResult => {
  const schema = Joi.object().keys({
    name: Joi.string(),
    detail: Joi.string(),
    image: Joi.any()
  });
  return schema.validate(data);
};
