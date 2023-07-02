const app = require("../express");
const sequelize = require("../sequelize");
const models = sequelize.models;

const request = require("supertest");
const {
    describe,
    beforeAll,
    afterAll,
    test,
    expect,
} = require("@jest/globals");
const { setUpDB } = require("./utils");

beforeAll(setUpDB);
afterAll(setUpDB);

describe("Order Module", () => {
    describe("POST /order/place-order", () => {
        let p1, p2, user;
        test("should order place successfully", async () => {
            p1 = await models.product.create({
                pName: "Pant",
                price: 500,
            });

            p1 = p1.get({ plain: true });

            p2 = await models.product.create({
                pName: "T-shirt",
                price: 900,
            });

            p2 = p2.get({ plain: true });

            user = await models.user.create({
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

            const products = [
                {
                    ...p1,
                    order_detail: {
                        quantity: 5,
                        product_id: p1.id,
                        order_id: expect.any(Number),
                    },
                },
                {
                    ...p2,
                    order_detail: {
                        quantity: 10,
                        product_id: p2.id,
                        order_id: expect.any(Number),
                    },
                },
            ];

            return request(app)
                .post("/order/place-order")
                .send(order)
                .expect("Content-Type", /json/)
                .expect(200)
                .then((response) => {
                    expect(response.body).toEqual({
                        success: true,
                        order: {
                            id: expect.any(Number),
                            order_status: order.order_status,
                            expected_delivery: expect.any(String),
                            orderDate: expect.any(String),
                            user_id: user.id,
                            user: user,
                            products: products,
                        },
                    });
                });
        });

        test("should not order placed on providing wrong date", async () => {
            const order = {
                order_status: "pending",
                expected_delivery: "2023-150-150",
                user_id: user.id,
                cart: [
                    { pid: p1.id, quantity: 5 },
                    { pid: p2.id, quantity: 10 },
                ],
            };

            return request(app)
                .post("/order/place-order")
                .send(order)
                .expect("Content-Type", /json/)
                .expect(500)
                .then((response) => {
                    expect(response.body).toEqual({
                        error: "Internal Server Error",
                        errorMessage:
                            "Incorrect datetime value: 'Invalid date' for column 'expected_delivery' at row 1",
                    });
                });
        });
    });

    describe("GET /order/fetch-all-order", () => {
        test("should fetch order data successfully", () => {
            return request(app)
                .get("/order/fetch-all-order")
                .expect("Content-Type", /json/)
                .expect(200)
                .then((response) => {
                    if (response.body.orders?.length === 0) return;

                    expect(response.body).toEqual({
                        success: true,
                        orders: expect.arrayContaining([
                            expect.objectContaining({
                                id: expect.any(Number),
                                order_status: expect.any(String),
                                expected_delivery: expect.any(String),
                                orderDate: expect.any(String),
                                user_id: expect.any(Number),
                            }),
                        ]),
                        orders: expect.any(Array),
                    });
                });
        });
    });
});
