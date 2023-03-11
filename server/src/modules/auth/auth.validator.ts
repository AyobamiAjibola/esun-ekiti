import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

export const authLogin = (data: any): Joi.ValidationResult => {
  const schema = Joi.object().keys({
    phone_num: Joi.string()
      .regex(/^[0-9]{11}$/)
      .messages({ "string.pattern.base": `Phone number must have 11 digits.` })
      .required(),
    password: passwordComplexity().required(),
  });
  return schema.validate(data);
};