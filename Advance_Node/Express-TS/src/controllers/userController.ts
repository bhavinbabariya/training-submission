import * as userService from "../services/userService";
import { Request, Response, NextFunction } from "express";
import { ReqUserBodyData } from "../types";
import { RequestWithUser } from "../middleware/verifyUser";

export const loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password }: ReqUserBodyData = req.body;

        const user = await userService.findUserByCredentials(email, password);

        if (!user) {
            res.status(404).json({
                success: false,
                message: "User Not Found",
            });
        }

        const authToken = userService.generateAuthToken(user);
        res.status(200).json({ success: true, data: { authToken } });
    } catch (error) {
        next(error);
    }
};

export const registeUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password }: ReqUserBodyData = req.body;

        const user = await userService.createUser(email, password);
        res.status(201).json({ success: true });
    } catch (error) {
        next(error);
    }
};

export const fetchUserWithComments = async (
    req: any,
    res: Response,
    next: NextFunction
) => {
    try {
        const { page, itemPerPage } = req.query;
        const user = await userService.fetchUserWithComments(
            req.user._id,
            page,
            itemPerPage
        );
        res.status(200).json({ success: true, user });
    } catch (error) {
        next(error);
    }
};

export const fetchuserwithPosts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = await userService.fetchuserwithPostCount();
        res.status(200).json({ success: true, data });
    } catch (error) {
        next(error);
    }
};
