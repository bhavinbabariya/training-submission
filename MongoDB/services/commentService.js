const Comment = require("../models/Comment");

const fetchCommentData = async (
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

module.exports = {
    fetchCommentData,
};
