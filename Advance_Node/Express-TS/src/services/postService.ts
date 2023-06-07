import Post from "../models/Post";
import { config } from "dotenv";
import { ErrorWithStatus } from "../types";

config();

export const fetchPostData = async (
    sortBy = "name:ASC",
    _page = "1",
    _itemPerPage = "5"
) => {
    let page: number = parseInt(_page);
    let itemPerPage: number = parseInt(_itemPerPage);

    const arr = sortBy.split(":");
    let field = arr[0];
    let order: 1 | -1 = arr[1] === "ASC" ? 1 : -1;

    if (arr[1] === undefined) order = 1;

    if (Number.isNaN(page)) {
        const error: ErrorWithStatus = new Error(
            "Page number should be in digit"
        );
        error.status = 400;
        throw error;
    }

    if (Number.isNaN(itemPerPage)) {
        const error: ErrorWithStatus = new Error(
            "itemPerPage should be in digit"
        );
        error.status = 400;
        throw error;
    }

    const filter = { [field]: order };

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

export const searchPost = async (
    searchText = "",
    _page = "1",
    _itemPerPage = "20"
) => {
    let page: number = parseInt(_page);
    let itemPerPage: number = parseInt(_itemPerPage);

    if (Number.isNaN(page)) {
        const error: ErrorWithStatus = new Error(
            "Page number should be in digit"
        );
        error.status = 400;
        throw error;
    }

    if (Number.isNaN(itemPerPage)) {
        const error: ErrorWithStatus = new Error(
            "itemPerPage should be in digit"
        );
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
