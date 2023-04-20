const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("order", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        order_status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        expected_delivery: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        orderDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
    });
};
