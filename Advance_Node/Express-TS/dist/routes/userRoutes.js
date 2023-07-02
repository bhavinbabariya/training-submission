"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyUser_1 = __importDefault(require("../middleware/verifyUser"));
const validateAuthRequest_1 = __importDefault(require("../middleware/validateAuthRequest"));
const validateQueryParams_1 = __importDefault(require("../middleware/validateQueryParams"));
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.post("/login", validateAuthRequest_1.default, userController_1.loginUser);
router.post("/register", validateAuthRequest_1.default, userController_1.registeUser);
router.get("/fetchuserwithcomments", verifyUser_1.default, validateQueryParams_1.default, userController_1.fetchUserWithComments);
router.get("/fetchuserwithPosts", validateQueryParams_1.default, userController_1.fetchuserwithPosts);
exports.default = router;
