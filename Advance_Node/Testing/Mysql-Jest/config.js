const dotenv = require("dotenv");

if (process.env.NODE_ENV === "test") {
    dotenv.config({ path: ".env.test" });
} else if (process.env.NODE_ENV === "production") {
    dotenv.config({ path: ".env" });
} else {
    dotenv.config({ path: ".env.local" });
}

const DB_CONFIG = {
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    db_name: process.env.DB_NAME,
    dialect: "mysql",
};

const APP_CONFIG = {
    port: process.env.PORT,
};

module.exports = { DB_CONFIG, APP_CONFIG };
