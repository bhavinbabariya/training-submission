import * as commentService from "../services/commentService";

import { Request, Response, NextFunction } from "express";
import { ReqQueryParam } from "../types";

export const fetchComment = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { sort, page, itemPerPage }: ReqQueryParam = req.query;

        const output = await commentService.fetchCommentData(
            sort,
            page,
            itemPerPage
        );
        res.status(200).json({ output });
    } catch (error) {
        next(error);
    }
};
