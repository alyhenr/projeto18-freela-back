import Joi from "joi";

export const newServiceSchema = data => Joi.object({
    description: Joi.string().min(10).required(),
    price: Joi.number().positive().required(),
    duration: Joi.number().min(1).required(),
    categories: Joi.array().items(Joi.string()).required(),
}).validate(data, { abortEarly: false });