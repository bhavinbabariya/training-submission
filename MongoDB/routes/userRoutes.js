const express = require("express");
const router = express.Router();
const verifyUser = require("../middleware/verifyUser");
const {
    loginUser,
    registeUser,
    fetchUserWithComments,
    fetchuserwithPosts,
} = require("../controllers/userController");

router.post("/login", loginUser);
router.post("/register", registeUser);
router.get("/fetchuserwithcomments", verifyUser, fetchUserWithComments);
router.get("/fetchuserwithPosts", fetchuserwithPosts);
module.exports = router;
