const http = require("http");

const RequestListner = (req, res) => {
    res.end("Hello World !!!");
};

const server = http.createServer(RequestListner);

const port = 3000;

// Listen the server
server.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
