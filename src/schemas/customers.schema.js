import JoiBase from "joi";
import JoiDate from "@joi/date";

const Joi = JoiBase.extend(JoiDate);

const insertIntoCustormersSchema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().min(10).max(11).pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/).required(),
    cpf: Joi.string().length(11).pattern(/^[0-9]+$/).required(),
    birthday: Joi.date().format('YYYY-MM-DD').greater('1900-01-01').required()
});

export default insertIntoCustormersSchema;