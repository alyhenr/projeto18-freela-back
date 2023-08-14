import Joi from "joi";

export const signUpSchema = data => Joi.object({
    name: Joi.string().min(5).required(),
    email: Joi.string().email().required(),
    city: Joi.string().required(),
    phone: Joi.string().min(7).max(15).required(),
    password: Joi.string().min(5).required(),
    samurai: Joi.boolean().required(),
    description: Joi.string().min(100),
}).validate(data, { abortEarly: false });


export const signInSchema = data => Joi.object({
    email: Joi.string().email(),
    password: Joi.string().min(5).required(),
}).validate(data, { abortEarly: false });