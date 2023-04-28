const Post = require("../models/Post");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

require("dotenv").config();
const secret = process.env.JWT_SECRET;

const fetchPostData = async (
    sortBy = "name:ASC",
    page = 1,
    itemPerPage = 5
) => {
    page = parseInt(page);
    itemPerPage = parseInt(itemPerPage);

    const arr = sortBy.split(":");
    let field = arr[0];
    let order = arr[1] === "ASC" ? 1 : -1;

    if (arr[1] === undefined) order = 1;

    if (Number.isNaN(page)) {
        const error = new Error("Page number should be in digit");
        error.status = 400;
        throw error;
    }

    if (Number.isNaN(itemPerPage)) {
        const error = new Error("itemPerPage should be in digit");
        error.status = 400;
        throw error;
    }

    const filter = {};
    filter[field] = order;

    const output = await Post.aggregate([
        {
            $facet: {
                totalCount: [{ $count: "count" }],
                posts: [
                    { $sort: filter },
                    { $skip: (page - 1) * itemPerPage },
                    { $limit: itemPerPage },
                ],
            },
        },
        {
            $project: {
                posts: 1,
                total_posts: { $arrayElemAt: ["$totalCount.count", 0] },
            },
        },
    ]);

    return output;
};

const searchPost = async (searchText, page = 1, itemPerPage = 20) => {
    page = parseInt(page);
    itemPerPage = parseInt(itemPerPage);

    if (Number.isNaN(page)) {
        const error = new Error("Page number should be in digit");
        error.status = 400;
        throw error;
    }

    if (Number.isNaN(itemPerPage)) {
        const error = new Error("itemPerPage should be in digit");
        error.status = 400;
        throw error;
    }

    const output = await Post.aggregate([
        {
            $match: { $text: { $search: searchText } },
        },
        {
            $facet: {
                totalCount: [{ $count: "count" }],
                posts: [
                    { $skip: (page - 1) * itemPerPage },
                    { $limit: itemPerPage },
                ],
            },
        },
        {
            $project: {
                posts: 1,
                total_posts: { $arrayElemAt: ["$totalCount.count", 0] },
            },
        },
    ]);

    return output;
};
module.exports = {
    fetchPostData,
    searchPost,
};
