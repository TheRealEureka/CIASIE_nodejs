const Joi = require('joi');

const commandeSchema = Joi.object({
    client_name: Joi.string().max(128).required(),
    client_mail: Joi.string().email().max(256).required(),
    delivery : Joi.object({
        date: Joi.string().required(),
        time: Joi.string().required(),
    })

}).unknown(true);

const updateOrderSchema = Joi.object({
    livraison: Joi.date().iso().required(),
    nom: Joi.string().required(),
    mail: Joi.string().email().required(),
}).unknown(false);

//module.exports = { updateOrderSchema };

module.exports = {commandeSchema, updateOrderSchema};
