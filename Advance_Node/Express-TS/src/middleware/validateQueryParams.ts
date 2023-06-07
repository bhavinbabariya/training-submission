import { Request, Response, NextFunction } from "express";

// interface CustomRequest extends Request {
//     query?: {
//         page: number | undefined;
//         itemPerPage: number | undefined;
//     };
// }

const validateQueryParams = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { page, itemPerPage } = req.query;
    (req as any).query = {
        ...req.query,
        ...{
            page: page ? (isNaN(+page) ? undefined : +page) : page,
            itemPerPage: itemPerPage
                ? isNaN(+itemPerPage)
                    ? undefined
                    : +itemPerPage
                : itemPerPage,
        },
    };
    next();
};

export default validateQueryParams;
