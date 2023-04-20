const postService = require("../services/postService");

const fetchPost = async (req, res, next) => {
    try {
        const { sort, page, itemPerPage } = req.query;
        const output = await postService.fetchPostData(sort, page, itemPerPage);
        res.status(200).json({ output });
    } catch (error) {
        next(error);
    }
};

const searchPost = async (req, res, next) => {
    try {
        const { query, page, itemPerPage } = req.query;
        const output = await postService.searchPost(query, page, itemPerPage);
        res.status(200).json({ data: output });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
module.exports = {
    fetchPost,
    searchPost,
};
