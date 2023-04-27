const express = require("express");
const router = express.Router();
const validateQueryParams = require("../middleware/validateQueryParams");

const { fetchComment } = require("../controllers/commentController");

router.get("/fetch", validateQueryParams, fetchComment);

module.exports = router;
