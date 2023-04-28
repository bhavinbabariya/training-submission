const validateQueryParams = (req, res, next) => {
    const { page, itemPerPage } = req.query;
    req.query = {
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

module.exports = validateQueryParams;
