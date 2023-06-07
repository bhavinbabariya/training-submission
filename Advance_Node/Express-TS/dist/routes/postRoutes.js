"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postController_1 = require("../controllers/postController");
const validateQueryParams_1 = __importDefault(require("../middleware/validateQueryParams"));
const router = (0, express_1.Router)();
router.get("/fetch", validateQueryParams_1.default, postController_1.fetchPost);
router.get("/search", validateQueryParams_1.default, postController_1.searchPost);
exports.default = router;
