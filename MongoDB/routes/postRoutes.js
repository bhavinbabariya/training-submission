const express = require("express");
const router = express.Router();

const { fetchPost, searchPost } = require("../controllers/postController");
const validateQueryParams = require("../middleware/validateQueryParams");
router.get("/fetch", validateQueryParams, fetchPost);
router.get("/search", validateQueryParams, searchPost);

module.exports = router;
