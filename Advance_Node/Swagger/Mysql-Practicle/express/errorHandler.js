module.exports = (error, req, res, next) => {
    res.status(500).json({
        error: "Internal Server Error",
        errorMessage: error.message,
    });
};
