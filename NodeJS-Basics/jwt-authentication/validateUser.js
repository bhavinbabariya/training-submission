const jwt = require("jsonwebtoken");
const secret = "authsecret";

const validateUser = (req, res, next) => {
    const token = req.cookies["auth-token"];

    if (!token) {
        return res.redirect("/login");
    }
    const user = jwt.verify(token, secret);

    if (!user) {
        return res.redirect("/login");
    }

    req.user = user;
    next();
};

module.exports = validateUser;
