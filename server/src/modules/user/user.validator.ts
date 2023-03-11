import Joi from "joi";

export const postAdmin = (data: any): Joi.ValidationResult => {
  const schema = Joi.object().keys({
    fullName: Joi.string().required(),
    phone_num: Joi.string()
      .regex(/^[0-9]{11}$/)
      .messages({ "string.pattern.base": `Phone number must have 11 digits.` })
      .required(),
    password: Joi.string()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*\W)(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .messages({
        "string.pattern.base": `Password does not meet requirement. Number, Special Character and one UpperCase letter must be present`,
      })
      .required(),
    confirm_password: Joi.ref("password"),
    unique: Joi.string(),
    isAdmin: Joi.boolean(),
    user_type: Joi.string().required(),
  });
  return schema.validate(data);
};

export const updAdmin = (data: any): Joi.ValidationResult => {
  const schema = Joi.object().keys({
    fullName: Joi.string(),
    phone_num: Joi.string()
      .regex(/^[0-9]{11}$/)
      .messages({ "string.pattern.base": `Phone number must have 11 digits.` }),
    password: Joi.string()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*\W)(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .messages({
        "string.pattern.base": `Password does not meet requirement. Number, Special Character and one UpperCase letter must be present`,
      }),
    confirm_password: Joi.ref("password")
  });
  return schema.validate(data);
};

