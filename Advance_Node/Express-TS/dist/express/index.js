"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const indexRoutes_1 = require("../routes/indexRoutes");
// middleware
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use("/user", indexRoutes_1.userRoutes);
app.use("/post", indexRoutes_1.postRoutes);
app.use("/comment", indexRoutes_1.commentRoutes);
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        message: err.message,
    });
});
exports.default = app;
