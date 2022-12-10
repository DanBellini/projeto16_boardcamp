import joi from 'joi';

const insertIntoGameSchema =joi.object({
    name: joi.string().required(),
    image: joi.string().pattern(new RegExp("^(http|https)://")),
    stockTotal: joi.number().integer().required().min(1),
    categoryId: joi.number().integer().required(),
    pricePerDay: joi.number().integer().required().min(1)
});

export default insertIntoGameSchema;