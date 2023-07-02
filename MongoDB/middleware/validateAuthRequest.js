const Joi = require("joi");

const validateAuthRequest = (req, res, next) => {
    const { email, password } = req.body;

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(3).required(),
    });

    const { error } = schema.validate({ email, password });
    if (error) {
        error.status = 400;
        return next(error);
    }

    next();
};

module.exports = validateAuthRequest;
