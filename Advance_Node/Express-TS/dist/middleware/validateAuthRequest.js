"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const validateAuthRequest = (req, res, next) => {
    const { email, password } = req.body;
    const schema = joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(3).required(),
    });
    const { error } = schema.validate({ email, password });
    if (error) {
        error.status = 400;
        return next(error);
    }
    next();
};
exports.default = validateAuthRequest;
