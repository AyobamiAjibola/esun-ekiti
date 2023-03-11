import Joi from "joi";

export const postNews = (data: any): Joi.ValidationResult => {
  const schema = Joi.object().keys({
    news: Joi.string().required(),
    title: Joi.string().required(),
    image: Joi.any()
  });
  return schema.validate(data);
};

export const updNews = (data: any): Joi.ValidationResult => {
  const schema = Joi.object().keys({
    news: Joi.string(),
    title: Joi.string(),
    image: Joi.any()
  });
  return schema.validate(data);
};
