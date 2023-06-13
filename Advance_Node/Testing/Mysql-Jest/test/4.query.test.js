const app = require("../express");
const request = require("supertest");
const { describe, beforeAll, test, expect } = require("@jest/globals");
const { setUpDB, placeOrderTest } = require("./utils");

describe("Query Module", () => {
    beforeAll(async () => {
        await setUpDB();
        await placeOrderTest(app);
    });

    test("should return all undelivered orders", () => {
        return request(app)
            .get("/query/1")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual({
                    success: true,
                    query: "allUndeliveredOrders",
                    orders: expect.arrayContaining([]),
                });
            });
    });

    test("should return most recent orders", () => {
        return request(app)
            .get("/query/2")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual({
                    success: true,
                    query: "mostRecentOrders",
                    orders: expect.arrayContaining([]),
                });
            });
    });

    test("should return active users", () => {
        return request(app)
            .get("/query/3")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual({
                    success: true,
                    query: "topFiveActiveUsers",
                    users: expect.arrayContaining([]),
                });
            });
    });

    test("should return inactive users", () => {
        return request(app)
            .get("/query/4")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual({
                    success: true,
                    query: "findInactiveUsers",
                    users: expect.arrayContaining([]),
                });
            });
    });

    test("should return top five most purchased products", () => {
        return request(app)
            .get("/query/5")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual({
                    success: true,
                    query: "topFiveMostPurchasedProduct",
                    products: expect.arrayContaining([]),
                });
            });
    });

    test("should return top five most expensive order", () => {
        return request(app)
            .get("/query/6")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual({
                    success: true,
                    query: "MostExpensiveOrder",
                    orders: expect.arrayContaining([]),
                });
            });
    });

    test("should return top five most cheapest order", () => {
        return request(app)
            .get("/query/7")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual({
                    success: true,
                    query: "MostChepestOrder",
                    orders: expect.arrayContaining([]),
                });
            });
    });
});
