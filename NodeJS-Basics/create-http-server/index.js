const http = require("http");

// Create HTTP server
const server = http.createServer((req, res) => {
    if (req.url === "/" && req.method === "GET") {
        res.writeHead(200);
        res.write("<h2>Welcome</h2>");
        res.write("<p>find whatever you want</p>");
    } else if (req.url === "/about" && req.method === "GET") {
        res.writeHead(200);
        res.write("<h2>About Page</h2>");
    } else if (req.url === "/help" && req.method === "GET") {
        res.writeHead(200);
        res.write("<h2>Help Page</h2>");
    } else if (req.url === "/contact" && req.method === "GET") {
        res.writeHead(200);
        res.write("<h2>Contact Page</h2>");
    } else if (req.url === "/getData" && req.method === "GET") {
        const data = {
            name: "bhavin",
            city: "surat",
        };

        // to send json data set Content-type application/json in Response Header
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);

        res.write(JSON.stringify(data));
    } else {
        // If not found then status code : 404
        res.writeHead(404);
        res.write("<h2>404 Not Found</h2>");
    }

    // declare end of response and send response to client
    res.end();
});

const port = 3000;

// Listen the server
server.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
