var app = require("../../app");
var assert = require('assert');
var fakes = require("../../spec/fakes/request");
var supertest = require("supertest");
var request = require("request");

describe("/representatives", function(){
  
  describe("/ GET", function(){
    
    it("should require street1, city, state, zip query params", function(done){
      supertest(app)
      .get("/representatives")
      .end(function(err, res){
        assert.ifError(err);
        expect(res.status).toEqual(400)
        expect(res.body.error.street1[0].code).toEqual('MISSING_PARAM');
        expect(res.body.error.city[0].code).toEqual('MISSING_PARAM');
        expect(res.body.error.state[0].code).toEqual('MISSING_PARAM');
        expect(res.body.error.zip[0].code).toEqual('MISSING_PARAM');
        done();
      })
    })
    
    it("should return normalized representative data from service", function(done){
      spyOn(request, 'get').and.callFake(fakes.google.locateRep200)
      supertest(app)
      .get("/representatives?street1=800+N+Damen&city=Chicago&state=IL&zip=60622")
      .end(function(err, res){
        assert.ifError(err);
        var body = res.body;
        expect(res.status).toEqual(200);
        expect(body.congressionalDistrict).toEqual("Illinois's 5th congressional district");
        expect(body.state).toEqual("Illinois")
        expect(body.representative).toEqual({
          name: "Mike Quigley",
          phones: ["(202) 225-4061"]
        })

        expect(body.senators[0]).toEqual({
          name: "Mark Kirk",
          phones: ["(202) 224-2854"]
        })

        expect(body.senators[1]).toEqual({
          name: "Richard J. Durbin",
          phones: ["(202) 224-2152"]
        })
        
        done();
      })
    })
  })
})
