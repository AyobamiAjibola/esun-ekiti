import Joi from "joi";

export const postHistory = (data: any): Joi.ValidationResult => {
  const schema = Joi.object().keys({
    history: Joi.string().required()
  });
  return schema.validate(data);
};

export const updHistory = (data: any): Joi.ValidationResult => {
  const schema = Joi.object().keys({
    history: Joi.string()
  });
  return schema.validate(data);
};