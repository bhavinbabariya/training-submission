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
exports.fetchCommentData = void 0;
const Comment_1 = __importDefault(require("../models/Comment"));
const fetchCommentData = (sortBy = "name:ASC", _page = "1", _itemPerPage = "5") => __awaiter(void 0, void 0, void 0, function* () {
    let page = parseInt(_page);
    let itemPerPage = parseInt(_itemPerPage);
    const arr = sortBy.split(":");
    let field = arr[0];
    let order = arr[1] === "ASC" ? 1 : -1;
    if (arr[1] === undefined)
        order = 1;
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
    const output = yield Comment_1.default.aggregate([
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
});
exports.fetchCommentData = fetchCommentData;
