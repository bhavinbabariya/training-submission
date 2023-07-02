import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { ReqUserBodyData } from "../types";

interface Err extends Joi.ValidationError {
    status?: number;
}

const validateAuthRequest = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email, password }: ReqUserBodyData = req.body;

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(3).required(),
    });

    const { error }: { error?: Err } = schema.validate({ email, password });
    if (error) {
        error.status = 400;
        return next(error);
    }

    next();
};

export default validateAuthRequest;
