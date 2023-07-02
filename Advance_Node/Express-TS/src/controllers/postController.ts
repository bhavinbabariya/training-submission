import * as postService from "../services/postService";

import { Request, Response, NextFunction } from "express";
import { ReqQueryParam, ReqQueryParamOfSearchPost } from "../types";

export const fetchPost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { sort, page, itemPerPage }: ReqQueryParam = req.query;
        const output = await postService.fetchPostData(sort, page, itemPerPage);
        res.status(200).json({ output });
    } catch (error) {
        next(error);
    }
};

export const searchPost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { query, page, itemPerPage }: ReqQueryParamOfSearchPost =
            req.query;

        const output = await postService.searchPost(query, page, itemPerPage);
        res.status(200).json({ data: output });
    } catch (error) {
        next(error);
    }
};
