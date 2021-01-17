import Joi from 'joi';

const required_only   = Joi.string().required();

const createPerson = Joi.object({
    name:           required_only,
    CPF:            required_only,
    dateOfBirth:    Joi.date().required(),
});


module.exports = { createPerson };