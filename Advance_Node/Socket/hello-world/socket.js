const app = require("./express");
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

let render_count = 0;

io.on("connection", (socket) => {
    console.log("socket : ", socket.id);

    socket.on("chat", (payload) => {
        console.log("payload is : ", payload);
        io.emit("chat", payload);
    });

    socket.on("render", (payload) => {
        console.log("render count : ", ++render_count);
    });
});

module.exports = server;
