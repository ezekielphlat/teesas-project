const chai = require("chai")
const chaiHTTP = require('chai-http');
const server = require("../app")


// Initiate the Assertion Method/Style
chai.should();

chai.use(chaiHTTP);

describe("Auth API", () => {

     // Test Delete Existing Test user
     describe("DELETE /users/:email", () => {
        it("It should DELETE test student if exists", (done) => {
            const email = "mochatest1@mocha.com"
            chai.request(server)
                .delete("/users/"+ email)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("status").eq(true);
                    res.body.should.have.property("message").eq("Successfully removed User")

                    done();
                })
        })
    });

    // Test POST Sign Up
    describe("POST /auth/signUp", () => {
        it("It should NOT sign up request with empty object", (done) => {
            const student = {

            };
            chai.request(server)
                .post("/auth/signUp")
                .send(student)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a("object");
                    res.body.should.have.property("status").eq(false);
                    res.body.should.have.property("message").eq("request is empty")

                    done();
                })
        })
    })
    // Test POST Sign Up
    describe("POST /auth/signUp", () => {
        it("It should NOT sign up request with incorrect password and confirm password", (done) => {
            const student = {
                childName: "mocha test1",
                email: "mochatest1@mocha.com",
                phoneNumber: "07030050019",
                countryCode: "234001",
                password: "password",
                confirmPassword: "pass",
                grade: "75",
                currentLevel: "A3"
            };
            chai.request(server)
                .post("/auth/signUp")
                .send(student)
                .end((err, res) => {
                    res.should.have.status(403);
                    res.body.should.be.a("object");
                    res.body.should.have.property("status").eq(false);
                    res.body.should.have.property("message").eq("password did not match")

                    done();
                })
        })
    })

    // Test POST Sign Up
    describe("POST /auth/signUp", () => {
        it("It should sign up a single student", (done) => {
            const student = {
                childName: "mocha test1",
                email: "mochatest1@mocha.com",
                phoneNumber: "07030050019",
                countryCode: "234001",
                password: "password",
                confirmPassword: "password",
                grade: "75",
                currentLevel: "A3"
            };
            chai.request(server)
                .post("/auth/signUp")
                .send(student)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a("object");
                    res.body.should.have.property("status").eq(true);
                    res.body.should.have.property("message").eq("learner created successfully")

                    done();
                })
        })


    })


    // Test POST Sign Up
    describe("POST /auth/signUp", () => {
        it("It should NOT sign up an existing student", (done) => {
            const student = {
                childName: "mocha test1",
                email: "mochatest1@mocha.com",
                phoneNumber: "07030050019",
                countryCode: "234001",
                password: "password",
                confirmPassword: "password",
                grade: "75",
                currentLevel: "A3"
            };
            chai.request(server)
                .post("/auth/signUp")
                .send(student)
                .end((err, res) => {
                    res.should.have.status(403);
                    res.body.should.be.a("object");
                    res.body.should.have.property("status").eq(false);
                    res.body.should.have.property("message").eq("Student already exists")

                    done();
                })
        })
    })

   
})