const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const fs = require("fs");
const path = require("path");
const app = express();
var session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const products = require("./ProductData");
const validateUser = require("./validateUser");

app.use(cors({ origin: "http://localhost:3000/" }));
app.use(
    helmet.contentSecurityPolicy({
        useDefaults: true,
        directives: { "img-src": ["'self'", "https: data:"] },
    })
);
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", "views");

const MONGODB_URI = "mongodb://localhost:27017/simform";

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: "sessions",
});

app.use(
    session({
        secret: "mysecret",
        resave: false,
        saveUninitialized: true,
        store: store,
        cookie: { expires: 10 * 60 * 1000 }, // Expire Time : 10 Minute
    })
);

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isAuthenticated;
    next();
});

// Routes --------->

app.use("/auth", require("./auth"));

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/logout", (req, res, next) => {
    req.session.destroy((err) => {
        if (err) throw err;

        res.redirect("/login");
    });
});

app.use(validateUser);

app.get("/", (req, res) => {
    res.render("home", { products: products });
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.post("/contact", (req, res) => {
    res.render("success", {
        success: true,
        message: "Form has been submitted successfully",
    });
});

app.use((err, req, res, next) => {
    res.status(500).json({
        success: false,
        message: `Internal Server Error : ${err.message}`,
    });
});
app.listen(3000, () => [console.log("App is listning on port : 3000 ")]);
