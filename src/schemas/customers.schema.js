import JoiBase from "joi";
import JoiDate from "@joi/date"

const Joi = JoiBase.extend(JoiDate);

const insertIntoCustormersSchema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().min(10).max(11).pattern(new RegExp("/^[0-9]+$/")).required(),
    cpf: Joi.string().length(11).pattern(new RegExp("/^[0-9]+$/")).required(),
    birthday: Joi.date().format('YYYY-MM-DD').greater('1900-01-01').required()
});

export default insertIntoCustormersSchema;