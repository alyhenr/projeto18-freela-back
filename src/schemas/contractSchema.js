import Joi from "joi";

export default data => Joi.object({
    requirements: Joi.string().required(),
    message: Joi.string(),
    duration: Joi.number().required(),
    totalPrice: Joi.number().required(),
}).validate(data, { abortEarly: false });