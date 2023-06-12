import Joi from "joi";

export const postCommentNews = (data:  any): Joi.ValidationResult => {
    const schema = Joi.object().keys({
        name: Joi.string().allow(''),
        comment: Joi.string().required()
    });
    return schema.validate(data);
};

export const postCommentProject = (data:  any): Joi.ValidationResult => {
    const schema = Joi.object().keys({
        name: Joi.string().allow(''),
        comment: Joi.string().required()
    });
    return schema.validate(data);
};