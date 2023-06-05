const sequelize = require("../../sequelize");
const { models } = sequelize;

const allUndeliveredOrders = async (req, res, next) => {
    try {
        const orders = await models.order.findAll({
            where: {
                order_status: "pending",
            },
        });
        res.status(200).json({
            success: true,
            query: "allUndeliveredOrders",
            orders,
        });
    } catch (error) {
        next(error);
    }
};

const mostRecentOrders = async (req, res, next) => {
    try {
        const orders = await models.order.findAll({
            order: [["orderDate", "DESC"]],
            limit: 5,
        });
        res.status(200).json({
            success: true,
            query: "mostRecentOrders",
            orders,
        });
    } catch (error) {
        next(error);
    }
};

const topFiveActiveUsers = async (req, res, next) => {
    try {
        const users = await models.order.findAll({
            attributes: [
                "user_id",
                [
                    sequelize.fn("COUNT", sequelize.col("user_id")),
                    "total_order",
                ],
            ],
            group: ["user_id"],
            limit: 5,
            order: [["total_order", "DESC"]],
            include: [{ model: models.user, as: "user" }],
        });
        res.status(200).json({
            success: true,
            query: "topFiveActiveUsers",
            users,
        });
    } catch (error) {
        next(error);
    }
};

const findInactiveUsers = async (req, res, next) => {
    try {
        const users = await models.user.findAll({
            include: {
                model: models.order,
                as: "order",
                attributes: [],
            },
            where: {
                "$order.id$": null,
            },
            attributes: { exclude: ["order"] },
        });
        res.status(200).json({
            success: true,
            query: "findInactiveUsers",
            users,
        });
    } catch (error) {
        next(error);
    }
};

const topFiveMostPurchasedProduct = async (req, res, next) => {
    try {
        const products = await models.order_detail.findAll({
            include: {
                model: models.product,
                as: "product",
            },
            attributes: [
                "product_id",
                [
                    sequelize.fn("SUM", sequelize.col("quantity")),
                    "total_quantity",
                ],
            ],
            group: ["product_id"],
            order: [["total_quantity", "DESC"]],
            limit: 5,
        });
        res.status(200).json({
            success: "topFiveMostPurchasedProduct",
            products,
        });
    } catch (error) {
        next(error);
    }
};

const MostExpensiveOrder = async (req, res, next) => {
    try {
        const orders = await models.order_detail.findAll({
            include: {
                model: models.product,
                as: "product",
                attributes: [],
            },
            attributes: [
                "order_id",
                [sequelize.literal("SUM(quantity*product.price)"), "total"],
            ],
            group: ["order_id"],
            order: [["total", "DESC"]],
            limit: 1,
        });
        res.status(200).json({
            success: "true",
            query: "MostExpensiveOrder",
            orders,
        });
    } catch (error) {
        next(error);
    }
};

const MostChepestOrder = async (req, res, next) => {
    try {
        const orders = await models.order_detail.findAll({
            include: {
                model: models.product,
                as: "product",
                attributes: [],
            },
            attributes: [
                "order_id",
                [sequelize.literal("SUM(quantity*product.price)"), "total"],
            ],
            group: ["order_id"],
            order: [["total", "ASC"]],
            limit: 1,
        });
        res.status(200).json({
            success: true,
            query: "MostChepestOrder",
            orders,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    allUndeliveredOrders,
    mostRecentOrders,
    topFiveActiveUsers,
    findInactiveUsers,
    topFiveMostPurchasedProduct,
    MostExpensiveOrder,
    MostChepestOrder,
};
