const Joi = require('@hapi/joi');
const BadRequestError = require('../exceptions/BadRequestError');

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
})

const loginValidator = (payload) => {
    const validationResult = loginSchema.validate(payload);

    if(validationResult.error) {
        throw new BadRequestError(validationResult.error.message);
    }
}

module.exports = {
    loginValidator
}