/* jslint node: true */
/* jslint mocha: true */
'use strict';

var chai = require("chai");
var chaiHttp = require("chai-http");

chai.use(chaiHttp);

var server = "http://localhost:8000/";

var projectObjects = require("../schemas/project");
var User = require("../schemas/user");

var testUser = new User({username: "test"});
var projectTestId = null;

describe("API REST", function() {
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

  describe("Save of a project", function() {
    var url = "project/save";
    var project = {
      name: "Test Project",
      user: 12345,
      tracks: ["test.mp3", "test.mp3"],
      filters: [[10,0,0,0,0,0,0,0,0,0,1,0,0,1], [5,0,0,0,0,0,0,0,0,0,1,0,0,1]],
      regions: [[0, 400], [200, 300]]
    };

    it("returns status 200 with project id", function(done) {
      chai
        .request(server)
        .post(url)
        .send(project)
        .end(function(error, response, body) {
          chai.expect(response.statusCode).to.equal(200);
          chai.expect(response.body).to.be.a('string');
          projectTestId = response.body;
          done();

          describe("Project manipulations", function() {
            var url = "project/"+projectTestId;

            it("return status 200", function(done) {
              chai
                .request(server)
                .get(url)
                .end(function(error, response) {
                  chai
                    .expect(response.statusCode).to.equal(200);
                  done();
                });
            });

            it("return the project", function(done) {
              chai
                .request(server)
                .get(url)
                .end(function(error, response) {
                  chai.expect(response.body.name).to.equal(project.name);
                  chai.expect(response.body.tracks).to.eql(project.tracks);
                  chai.expect(response.body.filters).to.eql(project.filters);
                  chai.expect(response.body.regions).to.eql(project.regions);
                  done();
                });
            });

            it("delete the project", function(done) {
              chai
                .request(server)
                .delete(url)
                .end(function(error, response) {
                  chai.expect(response.statusCode).to.equal(200);
                  done();
                });
            });
          });
      });
    });
  });
});