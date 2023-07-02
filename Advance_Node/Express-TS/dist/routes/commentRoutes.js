"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateQueryParams_1 = __importDefault(require("../middleware/validateQueryParams"));
const commentController_1 = require("../controllers/commentController");
const router = (0, express_1.Router)();
router.use(validateQueryParams_1.default);
router.get("/fetch", commentController_1.fetchComment);
exports.default = router;
