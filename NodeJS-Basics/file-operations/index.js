const express = require("express");
const fs = require("fs");
const multer = require("multer");

const app = express();

app.use("/static", express.static("uploads"));
app.set("view engine", "ejs");
app.set("views", "views");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
        }
    },
});

// Routes --------->

app.get("/", (req, res) => {
    res.render("home");
});

app.post("/upload", upload.single("file"), function (req, res, next) {
    const file = req.file;

    let data = fs.readFileSync("./data.json");
    data = data.toString() === "" ? [] : JSON.parse(data);
    data.push({ name: req.body.name, image: file.filename });
    fs.writeFileSync("data.json", JSON.stringify(data));

    res.redirect("/images");
});

app.get("/images", function (req, res, next) {
    let data = fs.readFileSync("./data.json");
    data = data.toString() === "" ? [] : JSON.parse(data);

    res.render("images", { data });
});

app.use((err, req, res, next) => {
    res.status(500).json({
        success: false,
        message: `Internal Server Error`,
    });
});
app.listen(3000, () => [console.log("App is listning on port : 3000 ")]);
