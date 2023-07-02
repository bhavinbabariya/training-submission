const express = require("express");
const router = express.Router();
const verifyUser = require("../middleware/verifyUser");
const validateAuthRequest = require("../middleware/validateAuthRequest");
const validateQueryParams = require("../middleware/validateQueryParams");

const {
    loginUser,
    registeUser,
    fetchUserWithComments,
    fetchuserwithPosts,
} = require("../controllers/userController");

router.post("/login", validateAuthRequest, loginUser);
router.post("/register", validateAuthRequest, registeUser);
router.get(
    "/fetchuserwithcomments",
    verifyUser,
    validateQueryParams,
    fetchUserWithComments
);
router.get("/fetchuserwithPosts", validateQueryParams, fetchuserwithPosts);
module.exports = router;
