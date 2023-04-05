const sequelize = require("../../sequelize");
const { models } = sequelize;

const fetchAllOrders = async (req, res, next) => {
    try {
        const orders = await models.order.findAll();
        res.status(200).json({ success: true, orders });
    } catch (error) {
        next(error);
    }
};

const placeOrder = async (req, res, next) => {
    const t = await sequelize.transaction();

    try {
        const data = req.body;

        const order = await models.order.create(
            {
                order_status: data.order_status,
                expected_delivery: data.expected_delivery,
                user_id: data.user_id,
            },
            { transaction: t }
        );

        await models.order_detail.bulkCreate(
            data.cart.map((product) => {
                return {
                    product_id: product.pid,
                    order_id: order.id,
                    quantity: product.quantity,
                };
            }),
            { transaction: t }
        );

        await t.commit();

        res.status(200).json({
            success: true,
            order: await order.reload({
                include: [
                    { model: models.user, as: "user" },
                    { model: models.product, as: "products" },
                ],
            }),
        });
    } catch (error) {
        await t.rollback();
        next(error);
    }
};
module.exports = { fetchAllOrders, placeOrder };
