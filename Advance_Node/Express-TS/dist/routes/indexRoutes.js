"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRoutes = exports.postRoutes = exports.userRoutes = void 0;
const userRoutes_1 = __importDefault(require("./userRoutes"));
exports.userRoutes = userRoutes_1.default;
const postRoutes_1 = __importDefault(require("./postRoutes"));
exports.postRoutes = postRoutes_1.default;
const commentRoutes_1 = __importDefault(require("./commentRoutes"));
exports.commentRoutes = commentRoutes_1.default;
