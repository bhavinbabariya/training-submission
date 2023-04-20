const commentService = require("../services/commentService");

const fetchComment = async (req, res, next) => {
    try {
        const { sort, page, itemPerPage } = req.query;

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

module.exports = {
    fetchComment,
};
