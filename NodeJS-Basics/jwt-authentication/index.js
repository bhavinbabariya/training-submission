const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

const products = require("./ProductData");
const validateUser = require("./validateUser");

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));

app.set("view engine", "ejs");
app.set("views", "views");

// Routes --------->

app.use("/auth", require("./auth"));

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.use(validateUser);

app.get("/", (req, res) => {
    res.render("home", { products: products });
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.post("/contact", (req, res) => {
    console.log(req.body);
    res.render("success", {
        success: true,
        message: "Form has been submitted successfully",
    });
});
app.listen(3000, () => {
    console.log("App is listning on port : 3000 ");
});
