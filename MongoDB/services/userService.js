const mongoose = require("mongoose");
const User = require("../models/User");
const Post = require("../models/Post");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

require("dotenv").config();
const secret = process.env.JWT_SECRET;

const findUserByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        const error = new Error("User Not Found");
        error.status = 404;
        throw error;
    }

    const isPass = await bcrypt.compare(password, user.password);

    if (!isPass) {
        const error = new Error("Incorrect Password");
        error.status = 401;
        throw error;
    }
    return user;
};

const generateAuthToken = (user) => {
    const token = jwt.sign({ user }, secret, { expiresIn: "3d" });
    return token;
};

const createUser = async (email, password) => {
    const salt = await bcrypt.genSalt(10);
    const newPass = await bcrypt.hash(password, salt);

    const user = await User.create({ email, password: newPass });
    delete user["password"];
    return user;
};

const fetchUserWithComments = async (id, page = 1, itemPerPage = 5) => {
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

    const users = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(id),
            },
        },
        {
            $lookup: {
                from: "comments",
                localField: "_id",
                foreignField: "userId",
                as: "comments",
                pipeline: [
                    {
                        $group: {
                            _id: "$postId",
                            all_comments: { $push: "$body" },
                        },
                    },
                    {
                        $lookup: {
                            from: "posts",
                            localField: "_id",
                            foreignField: "_id",
                            as: "posts",
                            pipeline: [
                                {
                                    $lookup: {
                                        from: "users",
                                        localField: "userId",
                                        foreignField: "_id",
                                        as: "users",
                                        pipeline: [
                                            {
                                                $project: {
                                                    _id: 0,
                                                    email: 1,
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    $addFields: {
                                        postedBy: {
                                            $arrayElemAt: ["$users.email", 0],
                                        },
                                    },
                                },
                                {
                                    $project: {
                                        _id: 0,
                                        title: 1,
                                        postedBy: 1,
                                        content: "$body",
                                    },
                                },
                            ],
                        },
                    },
                    {
                        $addFields: {
                            post: {
                                $arrayElemAt: ["$posts", 0],
                            },
                        },
                    },
                    {
                        $addFields: {
                            "post.all_comments": "$all_comments",
                            "post.total_comments": {
                                $size: "$all_comments",
                            },
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            post: 1,
                            commentData: "$body",
                        },
                    },
                    { $skip: (page - 1) * itemPerPage },
                    { $limit: itemPerPage },
                ],
            },
        },
        {
            $project: {
                _id: 0,
                email: 1,
                comments: 1,
                page: page.toString(),
            },
        },
    ]);
    return users[0];
};

const fetchuserwithPostCount = async () => {
    const data = await Post.aggregate([
        {
            $group: {
                _id: "$userId",
                total_post: { $sum: 1 },
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "_id",
                foreignField: "_id",
                as: "users",
            },
        },
        {
            $addFields: {
                user: {
                    $arrayElemAt: ["$users.email", 0],
                },
            },
        },
        {
            $project: {
                _id: 0,
                users: 0,
            },
        },
    ]);

    return data;
};
module.exports = {
    findUserByCredentials,
    generateAuthToken,
    createUser,
    fetchUserWithComments,
    fetchuserwithPostCount,
};
