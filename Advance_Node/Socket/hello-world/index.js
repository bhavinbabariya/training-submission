const server = require("./socket");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;

function init() {
    console.log("Express App Starting... ");

    server.listen(PORT, () => {
        console.log(`App is listning on port : ${PORT}`);
    });
}

init();
