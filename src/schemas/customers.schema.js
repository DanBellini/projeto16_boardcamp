import joi from "joi";

const insertIntoCustormersSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().min(10).max(11).pattern(new RegExp("/^[0-9]+$/")).required(),
    cpf: joi.string().length(11).pattern(new RegExp("/^[0-9]+$/")).required(),
    birthday:joi.date().format('YYYY-MM-DD').greater('1900-01-01').required()
});

export default insertIntoCustormersSchema;