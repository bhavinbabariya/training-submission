const express = require("express");
const query = require("../controller/query");

const router = express.Router();

router.get("/:id", (req, res, next) => {
    const id = Number.parseInt(req.params.id, 10);

    const queryFunctions = Object.values(query);
    queryFunctions[id - 1](req, res, next);
});
module.exports = router;
