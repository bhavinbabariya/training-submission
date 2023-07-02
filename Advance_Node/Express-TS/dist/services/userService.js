"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchuserwithPostCount = exports.fetchUserWithComments = exports.createUser = exports.generateAuthToken = exports.findUserByCredentials = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const Post_1 = __importDefault(require("../models/Post"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const secret = process.env.JWT_SECRET;
const findUserByCredentials = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ email });
    if (!user) {
        const error = new Error("User Not Found");
        error.status = 404;
        throw error;
    }
    const isPass = yield bcryptjs_1.default.compare(password, user.password);
    if (!isPass) {
        const error = new Error("Incorrect Password");
        error.status = 401;
        throw error;
    }
    return user;
});
exports.findUserByCredentials = findUserByCredentials;
const generateAuthToken = (user) => {
    const token = jsonwebtoken_1.default.sign({ user }, secret, { expiresIn: "3d" });
    return token;
};
exports.generateAuthToken = generateAuthToken;
const createUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcryptjs_1.default.genSalt(10);
    const newPass = yield bcryptjs_1.default.hash(password, salt);
    const user = yield User_1.default.create({
        email,
        password: newPass,
    });
    delete user["password"];
    return user;
});
exports.createUser = createUser;
const fetchUserWithComments = (id, _page = "1", _itemPerPage = "5") => __awaiter(void 0, void 0, void 0, function* () {
    let page = parseInt(_page);
    let itemPerPage = parseInt(_itemPerPage);
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
    const users = yield User_1.default.aggregate([
        {
            $match: {
                _id: new mongoose_1.default.Types.ObjectId(id),
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
});
exports.fetchUserWithComments = fetchUserWithComments;
const fetchuserwithPostCount = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Post_1.default.aggregate([
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
});
exports.fetchuserwithPostCount = fetchuserwithPostCount;
