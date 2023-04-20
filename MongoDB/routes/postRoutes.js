const express = require("express");
const router = express.Router();

const { fetchPost, searchPost } = require("../controllers/postController");

router.get("/fetch", fetchPost);
router.get("/search", searchPost);

module.exports = router;
