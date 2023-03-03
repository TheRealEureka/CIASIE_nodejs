const Joi = require('joi');

const commandeSchema = Joi.object({
    client_name: Joi.string().max(128).required(),
    client_mail: Joi.string().email().max(256).required(),
    delivery_date: Joi.object({
        date: Joi.date().required(),
        time: Joi.string().required()
    }).required(),
    id: Joi.string().max(128).required(),
    total_amount: Joi.number().precision(2).required()
});

module.exports = commandeSchema;
