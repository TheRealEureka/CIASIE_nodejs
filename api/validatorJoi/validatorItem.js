const Joi = require('joi');

const itemSchema = Joi.object({
    'uri' : Joi.string().max(256).required(),
    'libelle' : Joi.string().max(256).required(),
    'tarif' : Joi.number().required(),
    'quantite' : Joi.number().integer().positive().required(),
    'command_id' : Joi.string().max(256).required(),

});


module.exports = itemSchema;
