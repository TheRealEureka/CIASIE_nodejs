const Joi = require('joi');

const clientSchema = Joi.object({
    id: Joi.number().integer().positive(),
    nom_client: Joi.string().max(128).required(),
    mail_client: Joi.string().email().max(256).required(),
    passwd: Joi.string().max(256).required(),

});



module.exports = clientSchema;
