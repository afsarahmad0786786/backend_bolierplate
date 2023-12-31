const chai = require("chai");
const chaihttp = require("chai-http");
const app = require("../index");

chai.should();
chai.use(chaihttp);

describe("Auth Api", () => {
  describe("Sign up", () => {
    it("It should register the user", (done) => {
      chai
        .request(app)
        .post("/user/signup")
        .send({
          name: "Armaan122345",
          email: "armaan12232325432@gmail.com",
          password: "armaan@786",
          country: "india",
        })
        .end((error, response, body) => {
          console.log(response);
          //response.body.should.have.statusCode(200);
          response.body.should.be.a("object");
          response.body.should.have.property("newUser");
          response.body.should.have.property("qrCodeUrl");
          done();
        });
    });
  });
  describe("Sign In", () => {
    it("It should login the user", (done) => {
      chai
        .request(app)
        .post("/user/login")
        .send({
          email: "armaan1223232543@gmail.com",
          password: "armaan@786",
        })
        .end((error, response, body) => {
          console.log(response);
          //response.body.should.have.statusCode(200);
          response.body.should.be.a("object");
          response.body.should.have.property("message").eql("Login successful");
          done();
        });
    });
  });
  describe("MFA verify", () => {
    it("It should verify the google authentication", (done) => {
      chai
        .request(app)
        .post("/user/login")
        .send({
          email: "armaan1223232543@gmail.com",
          password: "armaan@786",
        })
        .end((error, response, body) => {
          console.log(response);
          //response.body.should.have.statusCode(200);
          response.body.should.be.a("object");
          response.body.should.have.property("message").eql("Login successful");
          done();
        });
    });
  });
});
