var path = require("path")
var appRoot = path.resolve(__dirname, "..", "..");
var representatives = require(`${appRoot}/services/representatives`)
var assert = require('assert')
var fakes = require("../fakes/request")
var request = require("request")

describe("representatives service", function(){
  describe("lookup() method", function(){
    
    it("should make request to google API", function(done){
      spyOn(request, 'get').and.callFake(fakes.google.locateRep200)
      representatives.locate({
        street: "800 N. Damen Ave.",
        street2: "#2500",
        city: "Chicago",
        state: "IL",
        zip: "60622"
      }, function(err, res){
        assert.ifError(err);
        expect(res.congressionalDistrict).toEqual("Illinois's 5th congressional district");
        expect(res.state).toEqual("Illinois")
        expect(res.representative).toEqual({
          name: "Mike Quigley",
          phones: ["(202) 225-4061"]
        })

        expect(res.senators[0]).toEqual({
          name: "Mark Kirk",
          phones: ["(202) 224-2854"]
        })

        expect(res.senators[1]).toEqual({
          name: "Richard J. Durbin",
          phones: ["(202) 224-2152"]
        })

        done();
      })
    })
  })
})
