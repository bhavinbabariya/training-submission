const express = require("express");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;

        let users = fs.readFileSync("./data.json");
        users = users.toString() === "" ? [] : JSON.parse(users);

        let user = users.find((user) => user.email === email);
        let flag = true;

        if (user) {
            const isPass = await bcrypt.compare(password, user.password);
            if (isPass) flag = false;
        }

        if (!user || flag) {
            return res.redirect("/login");
        } else {
            req.session.isAuthenticated = true;
            req.session.user = user;

            return req.session.save((err) => {
                if (err) throw err;
                res.redirect("/");
            });
        }
    } catch (err) {
        next(err);
    }
});

router.post("/register", async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const newPass = await bcrypt.hash(password, salt);

        let data = fs.readFileSync("./data.json");
        data = data.toString() === "" ? [] : JSON.parse(data);
        data.push({ email, password: newPass });

        fs.writeFileSync("data.json", JSON.stringify(data));

        return res.redirect("/login");
    } catch (err) {
        next(err);
    }
});
module.exports = router;
