var crypto = require('crypto');
var _ = require("lodash");

module.exports = {
  
  google: {
    /**
     * represents 200 response from rep lookup through google API 
     */
    locateRep200: function(url, done){
      return done(null, {
        body: `
          {
           "kind": "civicinfo#representativeInfoResponse",
           "normalizedInput": {
            "line1": "800 North Damen Avenue",
            "city": "Chicago",
            "state": "IL",
            "zip": "60622"
           },
           "divisions": {
            "ocd-division/country:us/state:il": {
             "name": "Illinois",
             "officeIndices": [
              0
             ]
            },
            "ocd-division/country:us/state:il/cd:5": {
             "name": "Illinois\'s 5th congressional district",
             "officeIndices": [
              1
             ]
            }
           },
           "offices": [
            {
             "name": "United States Senate",
             "divisionId": "ocd-division/country:us/state:il",
             "levels": [
              "country"
             ],
             "roles": [
              "legislatorUpperBody"
             ],
             "officialIndices": [
              0,
              1
             ]
            },
            {
             "name": "United States House of Representatives IL-05",
             "divisionId": "ocd-division/country:us/state:il/cd:5",
             "levels": [
              "country"
             ],
             "roles": [
              "legislatorLowerBody"
             ],
             "officialIndices": [
              2
             ]
            }
           ],
           "officials": [
            {
             "name": "Mark Kirk",
             "address": [
              {
               "line1": "524 hart senate office building",
               "city": "washington",
               "state": "DC",
               "zip": "20510"
              }
             ],
             "party": "Republican",
             "phones": [
              "(202) 224-2854"
             ],
             "urls": [
              "http://www.kirk.senate.gov/"
             ],
             "photoUrl": "http://bioguide.congress.gov/bioguide/photo/K/K000360.jpg",
             "channels": [
              {
               "type": "Facebook",
               "id": "SenatorKirk"
              },
              {
               "type": "Twitter",
               "id": "SenatorKirk"
              },
              {
               "type": "YouTube",
               "id": "SenatorKirk"
              }
             ]
            },
            {
             "name": "Richard J. Durbin",
             "address": [
              {
               "line1": "711 Hart Senate Bldg.",
               "city": "washington",
               "state": "DC",
               "zip": "20510"
              }
             ],
             "party": "Democratic",
             "phones": [
              "(202) 224-2152"
             ],
             "urls": [
              "http://www.durbin.senate.gov/public/"
             ],
             "photoUrl": "http://durbin.senate.gov/imo/media/image/durbin.jpg",
             "channels": [
              {
               "type": "Facebook",
               "id": "SenatorDurbin"
              },
              {
               "type": "Twitter",
               "id": "SenatorDurbin"
              },
              {
               "type": "YouTube",
               "id": "SenatorDurbin"
              }
             ]
            },
            {
             "name": "Mike Quigley",
             "address": [
              {
               "line1": "1124 longworth hob",
               "city": "washington",
               "state": "DC",
               "zip": "20515"
              }
             ],
             "party": "Democratic",
             "phones": [
              "(202) 225-4061"
             ],
             "urls": [
              "http://quigley.house.gov/"
             ],
             "photoUrl": "http://bioguide.congress.gov/bioguide/photo/Q/Q000023.jpg",
             "channels": [
              {
               "type": "Facebook",
               "id": "repmikequigley"
              },
              {
               "type": "Twitter",
               "id": "RepMikeQuigley"
              },
              {
               "type": "YouTube",
               "id": "RepMikeQuigley"
              }
             ]
            }
           ]
          }
        `
      })
    }
  },
  
  mailchimp: {
    
    /**
     * represents 200 response from post to create new mailchimp list member
     */
    postMember200: function(url, reqBody, done) {
      email = reqBody.body.email_address.toLowerCase();
      var md5email = crypto.createHash('md5')
                           .update(email)
                           .digest('hex')
                           .toString();
      
      var body = reqBody.body
      body.id = md5email
      return done(null, {
        body: body
      })
    }
  }
}
