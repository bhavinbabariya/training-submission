import jwt, { JwtPayload } from "jsonwebtoken";

import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import { ErrorWithStatus } from "../types";
dotenv.config();

export interface RequestWithUser extends Request {
    user?: string | JwtPayload;
}

const verifyUser = (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
) => {
    const token = req.header("authToken");

    if (!token) {
        const error: ErrorWithStatus = new Error("Unauthorized");
        error.status = 401;
        throw error;
    }
    try {
        const data = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JwtPayload;

        req.user = data.user;

        next();
    } catch (error) {
        next(error);
    }
};

export default verifyUser;
