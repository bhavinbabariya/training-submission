const express = require("express");
const fs = require("fs");

const app = express();

app.get("/file/:filename", (req, res) => {
    console.log("filename : ", req.params.filename);
    const readstream = fs.createReadStream(req.params.filename);
    readstream.pipe(res);
});

app.listen(3000, () => {
    console.log("app is listning on 3000");
});

const readstream = fs.createReadStream("first.txt");
const writestream = fs.createWriteStream("second.txt");

readstream.on("data", (chunk) => {
    const data = chunk.toString().toUpperCase();
    writestream.write(data);
});
