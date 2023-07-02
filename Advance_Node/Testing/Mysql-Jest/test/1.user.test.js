const app = require("../express");

const request = require("supertest");
const {
    describe,
    beforeAll,
    afterAll,
    test,
    expect,
} = require("@jest/globals");
const { setUpDB } = require("./utils");

beforeAll(async () => {
    await setUpDB();
});
afterAll(async () => {
    await setUpDB();
});

describe("User Module", () => {
    describe("POST /user/create-user", () => {
        test("should create user successfully", () => {
            const user = {
                firstName: "bhavin",
                lastName: "babariya",
                contact: "8956237452",
            };
            return request(app)
                .post("/user/create-user")
                .send(user)
                .expect("Content-Type", /json/)
                .expect(200)
                .then((response) => {
                    expect(response.body).toEqual({
                        success: true,
                        user: {
                            id: expect.any(Number),
                            ...user,
                        },
                    });
                });
        });

        test("should give error on low length contact", () => {
            const user = {
                firstName: "bhavin",
                lastName: "babariya",
                contact: "898956",
            };
            return request(app)
                .post("/user/create-user")
                .send(user)
                .expect("Content-Type", /json/)
                .expect(500)
                .then((response) => {
                    expect(response.body).toEqual({
                        error: "Internal Server Error",
                        errorMessage:
                            "Validation error: Validation len on contact failed",
                    });
                });
        });

        test("should give error on more length contact", () => {
            const user = {
                firstName: "bhavin",
                lastName: "babariya",
                contact: "544412461412",
            };
            return request(app)
                .post("/user/create-user")
                .send(user)
                .expect("Content-Type", /json/)
                .expect(500)
                .then((response) => {
                    expect(response.body).toEqual({
                        error: "Internal Server Error",
                        errorMessage:
                            "Validation error: Validation len on contact failed",
                    });
                });
        });

        test("should give error on excluding lastName", () => {
            const user = {
                firstName: "bhavin",
                contact: "8956238596",
            };
            return request(app)
                .post("/user/create-user")
                .send(user)
                .expect("Content-Type", /json/)
                .expect(500)
                .then((response) => {
                    expect(response.body).toEqual({
                        error: "Internal Server Error",
                        errorMessage:
                            "notNull Violation: user.lastName cannot be null",
                    });
                });
        });
    });

    describe("GET /user/fetch-all-user", () => {
        test("should fetch user data successfully", () => {
            return request(app)
                .get("/user/fetch-all-user")
                .expect("Content-Type", /json/)
                .expect(200)
                .then((response) => {
                    if (response.body.users?.length === 0) return;

                    expect(response.body).toEqual({
                        success: true,
                        users: expect.arrayContaining([
                            expect.objectContaining({
                                id: expect.any(Number),
                                firstName: expect.any(String),
                                lastName: expect.any(String),
                                contact: expect.any(String),
                                order: expect.arrayContaining([]),
                            }),
                        ]),
                    });
                });
        });
    });
});
