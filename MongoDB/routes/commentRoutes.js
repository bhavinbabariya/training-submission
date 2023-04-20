const express = require("express");
const router = express.Router();

const { fetchComment } = require("../controllers/commentController");

router.get("/fetch", fetchComment);

module.exports = router;
