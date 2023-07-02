"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// interface CustomRequest extends Request {
//     query?: {
//         page: number | undefined;
//         itemPerPage: number | undefined;
//     };
// }
const validateQueryParams = (req, res, next) => {
    const { page, itemPerPage } = req.query;
    req.query = Object.assign(Object.assign({}, req.query), {
        page: page ? (isNaN(+page) ? undefined : +page) : page,
        itemPerPage: itemPerPage
            ? isNaN(+itemPerPage)
                ? undefined
                : +itemPerPage
            : itemPerPage,
    });
    next();
};
exports.default = validateQueryParams;
