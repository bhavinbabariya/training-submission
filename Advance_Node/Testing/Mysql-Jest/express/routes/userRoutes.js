const express = require("express");
const { fetchAllUser, createUser } = require("../controller/user");

const router = express.Router();

router.get("/fetch-all-user", fetchAllUser);
router.post("/create-user", createUser);
module.exports = router;
