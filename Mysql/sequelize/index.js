const Sequelize = require("sequelize");
const { defineAssociation } = require("./helper");

const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
    "practice",
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        define: {
            timestamps: false,
        },
    }
);

// Define models
const modelDefiners = [
    require("./models/User"),
    require("./models/Product"),
    require("./models/Order"),
    require("./models/Order_Detail"),
];

for (const modelDefiner of modelDefiners) modelDefiner(sequelize);

defineAssociation(sequelize);
module.exports = sequelize;
