const app = require("../express");

const request = require("supertest");
const { describe, beforeAll, test, expect } = require("@jest/globals");
const { setUpDB } = require("./utils");

beforeAll(async () => {
    await setUpDB();
});

describe("Product Module", () => {
    describe("POST /product/add-product", () => {
        test("should product added successfully", () => {
            const product = {
                pName: "T-shirt",
                price: 555,
            };
            return request(app)
                .post("/product/add-product")
                .send(product)
                .expect("Content-Type", /json/)
                .expect(200)
                .then((response) => {
                    expect(response.body).toEqual({
                        success: true,
                        product: {
                            id: expect.any(Number),
                            ...product,
                        },
                    });
                });
        });

        test("should give error on entering negative price of product", () => {
            const product = {
                pName: "T-shirt",
                price: -50,
            };
            return request(app)
                .post("/product/add-product")
                .send(product)
                .expect("Content-Type", /json/)
                .expect(500)
                .then((response) => {
                    expect(response.body).toEqual({
                        error: "Internal Server Error",
                        errorMessage:
                            "Validation error: Validation min on price failed",
                    });
                });
        });

        test("should give error on excluding price in order", () => {
            const product = {
                pName: "biscuit-500",
            };
            return request(app)
                .post("/product/add-product")
                .send(product)
                .expect("Content-Type", /json/)
                .expect(500)
                .then((response) => {
                    expect(response.body).toEqual({
                        error: "Internal Server Error",
                        errorMessage:
                            "notNull Violation: product.price cannot be null",
                    });
                });
        });
    });

    describe("GET product/fetch-all-product", () => {
        test("should fetch product data successfully", () => {
            return request(app)
                .get("/product/fetch-all-product")
                .expect("Content-Type", /json/)
                .expect(200)
                .then((response) => {
                    if (response.body.products?.length === 0) return;

                    expect(response.body).toEqual({
                        success: true,
                        products: expect.arrayContaining([
                            expect.objectContaining({
                                id: expect.any(Number),
                                pName: expect.any(String),
                                price: expect.any(Number),
                            }),
                        ]),
                    });
                });
        });
    });
});
