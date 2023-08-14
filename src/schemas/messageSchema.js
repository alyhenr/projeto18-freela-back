import Joi from "joi";

export default data => Joi.object({
    senderId: Joi.number().required(),
    receiverId: Joi.number().required(),
    message: Joi.string().required(),
}).validate(data, { abortEarly: false });