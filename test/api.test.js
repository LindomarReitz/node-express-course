const assert = require('chai').assert;
const request = require("supertest");

const app = require('../server')

describe("GET /users", function () {
    it("returns a list of users", function (done) {
        request(app)
            .get("/users")
            .expect(200, {
                success: true,
                message: "successfully got users. Nice!",
                users: ['Mark', 'Jill']
            }, done);
    });

    it("returns a user", function (done) {
        request(app)
            .get("/users/mark")
            .expect(200, {
                success: true,
                message: "got one user",
                user: "mark"
            }, done);
    });
});

describe("POST /login", function () {
    it("successful login", function (done) {
        request(app)
            .post("/login")
            .send({ username: "billyTheKid", password: "superSecret" })
            .expect(200, {
                success: true,
                message: "password and username match!",
                token: "encrypted token goes here"
            }, done);
    });

    it("unsuccessful login", function (done) {
        request(app)
            .post("/login")
            .send({ username: "billyTheKid", password: "invalidPassword" })
            .expect(200, {
                success: false,
                message: "password and username do not match",
            }, done);
    });
});
