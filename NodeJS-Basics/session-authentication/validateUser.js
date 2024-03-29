const validateUser = (req, res, next) => {
    const isAuthenticated = req.session.isAuthenticated;

    if (!isAuthenticated) {
        return res.redirect("/login");
    }

    next();
};

module.exports = validateUser;
