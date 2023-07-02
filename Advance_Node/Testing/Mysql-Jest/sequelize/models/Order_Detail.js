const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("order_detail", {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
};
