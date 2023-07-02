import mongoose from "mongoose";
import User, { IUser, IUserWithoutPassword } from "../models/User";
import Post from "../models/Post";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
import { ErrorWithStatus } from "../types";

config();
const secret: string = process.env.JWT_SECRET as string;

export const findUserByCredentials = async (
    email: string,
    password: string
) => {
    const user: IUser | null = await User.findOne({ email });

    if (!user) {
        const error: ErrorWithStatus = new Error("User Not Found");
        error.status = 404;
        throw error;
    }

    const isPass = await bcrypt.compare(password, user.password);

    if (!isPass) {
        const error: ErrorWithStatus = new Error("Incorrect Password");
        error.status = 401;
        throw error;
    }
    return user;
};

export const generateAuthToken = (user: IUser) => {
    const token = jwt.sign({ user }, secret, { expiresIn: "3d" });
    return token;
};

export const createUser = async (email: string, password: string) => {
    const salt = await bcrypt.genSalt(10);
    const newPass = await bcrypt.hash(password, salt);

    const user: IUserWithoutPassword = await User.create({
        email,
        password: newPass,
    });
    delete user["password"];
    return user;
};

export const fetchUserWithComments = async (
    id: string,
    _page = "1",
    _itemPerPage = "5"
) => {
    let page = parseInt(_page);
    let itemPerPage = parseInt(_itemPerPage);

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

export const fetchuserwithPostCount = async () => {
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
