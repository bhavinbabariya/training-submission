"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifyUser = (req, res, next) => {
    const token = req.header("authToken");
    if (!token) {
        const error = new Error("Unauthorized");
        error.status = 401;
        throw error;
    }
    try {
        const data = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = data.user;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = verifyUser;
