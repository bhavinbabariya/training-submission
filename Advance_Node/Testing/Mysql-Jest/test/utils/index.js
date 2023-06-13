const models = require("../../sequelize").models;
const request = require("supertest");

const setUpDB = async () => {
    await models.user.destroy({
        where: {},
    });

    await models.product.destroy({
        where: {},
    });

    await models.order.destroy({
        where: {},
    });

    await models.order_detail.destroy({
        where: {},
    });
};

const placeOrderTest = async (app) => {
    let p1 = await models.product.create({
        pName: "Pant",
        price: 500,
    });

    p1 = p1.get({ plain: true });

    let p2 = await models.product.create({
        pName: "T-shirt",
        price: 900,
    });

    p2 = p2.get({ plain: true });

    let user = await models.user.create({
        firstName: "meet",
        lastName: "vaishnani",
        contact: "8956235263",
    });
    user = user.get({ plain: true });

    const order = {
        order_status: "pending",
        expected_delivery: "2023-06-15",
        user_id: user.id,
        cart: [
            { pid: p1.id, quantity: 5 },
            { pid: p2.id, quantity: 10 },
        ],
    };

    return request(app).post("/order/place-order").send(order);
};
module.exports = { setUpDB, placeOrderTest };
