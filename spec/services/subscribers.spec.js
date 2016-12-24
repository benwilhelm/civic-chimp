var path = require("path")
var appRoot = path.resolve(__dirname, "..", "..");
var subscribers = require(`${appRoot}/services/subscribers`)
var assert = require('assert')
var fakes = require("../fakes/request")
var request = require("request")

describe("subscribers service", function(){
  describe("subscribe() method", function(){
    
    it("should make POST request to Mailchimp API", function(done){
      spyOn(request, 'post').and.callFake(fakes.mailchimp.postMember200);
      spyOn(request, 'put');
      
      var mergeFields = {
        ZIP        : "60625",
        STATE      : "Illinois",
        CONG_DIST  : "Illinois Fifth Congressional District",
        US_REP     : "Mike Quigley",
        US_REP_PHO : "(202) 225-4061",
        US_SEN_1   : "Mark Kirk",
        US_SEN1_PH : "(202) 224-2854",
        US_SEN_2   : "Richard J. Durbin",
        US_SEN2_PH : "(202) 224-2152"
      }
      
      subscribers.subscribe('test@example.com', mergeFields, function(err, res){
        assert.ifError(err);
        
        const MC_API_KEY = process.env.MC_API_KEY;
        const MC_LIST_ID = process.env.MC_LIST_ID;
        const MC_URL_BASE = subscribers.apiUrlBase();
        
        var postUrl = `${MC_URL_BASE}/lists/${MC_LIST_ID}/members`
        var postArgs = request.post.calls.argsFor(0);
        
        expect(request.post).toHaveBeenCalled();
        expect(request.put).not.toHaveBeenCalled();

        expect(postArgs[0]).toEqual(postUrl);
        expect(postArgs[1].body.email_address).toEqual('test@example.com');
        expect(postArgs[1].body.status).toEqual('subscribed');
        expect(postArgs[1].body.email_type).toEqual('html');
        expect(postArgs[1].body.merge_fields).toEqual(mergeFields);
        expect(postArgs[1].json).toEqual(true);
        expect(postArgs[1].auth.pass).toEqual(process.env.MC_API_KEY);
        
        expect(res.body.id).toEqual('55502f40dc8b7c769880b10874abc9d0');
        expect(res.body.email_address).toEqual('test@example.com');
        expect(res.body.merge_fields.ZIP).toEqual('60625');
        done();
      })
    })
  })
})
