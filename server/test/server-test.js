/* jslint node: true */
/* jslint mocha: true */
'use strict';

var expect = require("chai").expect;
var request = require("request");

describe("API REST", function() {
    describe("Creation of a playlist", function() {
        var url = "http://localhost:3000/playlist/new";

        it("returns status 200", function() {
            request(url, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
        it("returns playlist id", function() {
            request(url, function(error, response, body) {
                expect(body).to.be.a('string');
                done();
            });
        });
    });
});