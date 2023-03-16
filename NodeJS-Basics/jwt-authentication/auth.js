const express = require("express");
const fs = require("fs");

const app = express();
const router = express.Router();
const jwt = require("jsonwebtoken");
const secret = "authsecret";

let id = 1;
const users = [];

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    let users = fs.readFileSync("./data.json");
    users = JSON.parse(users);

    let index = users.findIndex((user) => {
        return user.email === email && user.password === user.password;
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
