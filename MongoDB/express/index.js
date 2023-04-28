const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const {
    userRoutes,
    postRoutes,
    commentRoutes,
} = require("../routes/indexRoutes");

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        message: err.message,
    });
});

module.exports = app;
