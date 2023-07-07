const express = require("express");
const cors = require("cors");
const app = express();

app.use(
    cors({
        origin: "*",
    })
);
app.get("/", (req, res) => {
    res.json({ success: true });
});
module.exports = app;
