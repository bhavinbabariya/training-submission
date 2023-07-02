const express = require("express");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

let id = 1;

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    let users = fs.readFileSync("./data.json");
    users = JSON.parse(users);

    let index = users.findIndex((user) => {
        return user.email === email && user.password === password;
    });

    if (index === -1) {
        return res.redirect("/login");
    } else {
        const token = jwt.sign(users[index], secret);
        res.cookie("auth-token", token);
        res.redirect("/");
    }
});

router.post("/register", (req, res) => {
    const { email, password } = req.body;

    let data = fs.readFileSync("./data.json");
    data = JSON.parse(data);
    data.push({ email, password, id: id++ });

    fs.writeFileSync("data.json", JSON.stringify(data));

    return res.redirect("/login");
});
module.exports = router;
