const Sequelize = require("sequelize");
const { defineAssociation } = require("./helper");
const { DB_CONFIG } = require("../config");

const sequelize = new Sequelize(
    DB_CONFIG.db_name,
    DB_CONFIG.username,
    DB_CONFIG.password,
    {
        host: DB_CONFIG.host,
        dialect: DB_CONFIG.dialect,
        logging: process.env.NODE_ENV === "development" ? true : false,
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
