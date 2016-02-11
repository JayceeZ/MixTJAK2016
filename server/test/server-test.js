/* jslint node: true */
/* jslint mocha: true */
'use strict';

var chai = require("chai");
var chaiHttp = require("chai-http");

chai.use(chaiHttp);

var server = "";

var projectObjects = require("../schemas/project");
var User = require("../schemas/user");

var testUserId = null;
var projectTestId = null;

describe("API REST", function() {
  before(function(done) {
    var url = "register";

    var user = {
      username: "test",
      password: "test"
    };
    chai
      .request(server)
      .post(url)
      .send(user)
      .end(function(error, response) {
        if(response.statusCode !== 401) {
          chai.expect(response.statusCode).to.equals(200);
          chai.expect(response.body.id).to.be.a('string');
          chai.expect(response.body.rights).to.be.a('number');
        }
        testUserId = response.body;
        done();
      });
  });

  describe("Fetch of a sound", function() {
    var url = "uploads/test.mp3";

    it("returns status 200", function(done) {
      chai
        .request(server)
        .get(url)
        .end(function (err, res) {
          if(err)
            done(err);
          chai.expect(res).to.have.status(200);
          done();
        });
    });
    it("returns file buffer", function(done) {
      chai
        .request(server)
        .get(url)
        .end( function(err, res) {
          chai.expect(res).to.have.status(200);
          done();
      });
    });
  });
  describe("User activity", function() {

    before(function(done) {
      var url = "login";

      var user = {
        username: "test",
        password: "test"
      };
      chai
        .request(server)
        .post(url)
        .send(user)
        .end(function(error, response) {
          chai.expect(response.statusCode).to.equals(200);
          // TODO: test id/rights
          done();
        });
    });

    describe("Save of a project", function () {
      var url = "project/save";
      var project = {
        name: "Test Project",
        user: testUserId,
        tracks: ["test.mp3", "test.mp3"],
        filters: [[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1], [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1]],
        regions: [[0, 400], [200, 300]]
      };

      it("returns status 200 with project id", function (done) {
        chai
          .request(server)
          .post(url)
          .send(project)
          .end(function (error, response) {
            chai.expect(response.statusCode).to.equal(200);
            chai.expect(response.body).to.be.a('string');
            projectTestId = response.body;
            done();

            describe("Project manipulations", function () {
              var url = "project/" + projectTestId;

              it("return status 200", function (done) {
                chai
                  .request(server)
                  .get(url)
                  .end(function (error, response) {
                    chai
                      .expect(response.statusCode).to.equal(200);
                    done();
                  });
              });

              it("return the project", function (done) {
                chai
                  .request(server)
                  .get(url)
                  .end(function (error, response) {
                    chai.expect(response.body.name).to.equal(project.name);
                    chai.expect(response.body.tracks).to.eql(project.tracks);
                    chai.expect(response.body.filters).to.eql(project.filters);
                    chai.expect(response.body.regions).to.eql(project.regions);
                    done();
                  });
              });

              it("delete the project", function (done) {
                chai
                  .request(server)
                  .delete(url)
                  .end(function (error, response) {
                    chai.expect(response.statusCode).to.equal(200);
                    done();
                  });
              });
            });
          });
      });
    });
  });
});