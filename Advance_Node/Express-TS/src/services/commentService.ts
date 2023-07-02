import { ErrorWithStatus } from "../types";
import Comment from "../models/Comment";

export const fetchCommentData = async (
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

    const output = await Comment.aggregate([
        {
            $facet: {
                totalCount: [{ $count: "count" }],
                comments: [
                    { $sort: filter },
                    { $skip: (page - 1) * itemPerPage },
                    { $limit: itemPerPage },
                ],
            },
        },
        {
            $project: {
                comments: 1,
                total_comments: { $arrayElemAt: ["$totalCount.count", 0] },
            },
        },
    ]);
    return output;
};
