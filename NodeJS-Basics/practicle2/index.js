const data = require("./data");
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// user Date
const dateString = "03/17/2023 10:00 AM";
const user_date = new Date(dateString);
const user_come = user_date.getTime();

const day = user_date.getDay();
const shop_status = data.find((obj) => obj.day === days[day]);

const date = dateString.split(" ")[0];
const shop_open_date = new Date(`${date} ${shop_status.open}`);
const shop_close_date = new Date(`${date} ${shop_status.close}`);

// this is the
const shop_open_from = shop_open_date.getTime();
const shop_open_till = shop_close_date.getTime();

console.log((shop_open_till - shop_open_from) / (60 * 60 * 1000));

if (!shop_status) {
    console.log("CLOSED");
    process.exit();
}

if (user_come >= shop_open_from && user_come <= shop_open_till) {
    console.log("OPEN");
} else {
    console.log("CLOSED");
}

const express = require("express");
const path = require("path");

const app = express();

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(3000, () => {
    console.log("app is listning on 3000");
});
