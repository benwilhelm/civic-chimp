var app = require("../../app");
var assert = require('assert');
var fakes = require("../../spec/fakes/request");
var supertest = require("supertest");
var request = require("request");

describe("/subscribers", function(){
  
  describe("/ POST", function(){
    
    it("should require email address", function(done){
      spyOn(request, 'post').and.callFake(fakes.mailchimp.postMember200)
      supertest(app)
      .post("/subscribers")
      .end(function(err, res){
        assert.ifError(err);
        expect(res.status).toEqual(400)
        expect(res.body.error.email[0].code).toEqual('MISSING_PARAM');
        done();
      })
    })
    
    it("should return 200 on successful subscription", function(done){
      spyOn(request, 'post').and.callFake(fakes.mailchimp.postMember200)
      supertest(app)
      .post("/subscribers")
      .send({ email: "test@example.com" })
      .end(function(err, res){
        assert.ifError(err);
        expect(res.status).toEqual(200);
        done();
      })
    })
    
    it("should return 409 if email already exists", function(done){
      spyOn(request, 'post').and.callFake(fakes.mailchimp.postMemberAlreadyExists)
      supertest(app)
      .post("/subscribers")
      .send({ email: "test@example.com"})
      .end(function(err, res){
        assert.ifError(err);
        expect(res.status).toEqual(400)
        expect(res.body.error.STATUS_CODE).toEqual("MEMBER_EXISTS")
        done();
      })
    })
  })
})
