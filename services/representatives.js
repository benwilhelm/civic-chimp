const API_KEY = process.env.LEGISLATOR_API_KEY
var _ = require("lodash");
var request = require("request");


/**
 * Takes hash of address fields and makes a request to the Google 
 * Civic Data API to retrieve corresponding legislator info.
 * @param {object} address - requested address. 
 *   String fields street, street2, city, state, zip
 * @callback {requestCallback} done - The callback that handles the response
 */
function locate(address, done) {

  var validAddress;
  try {
    validAddress = validateAddress(address);
  } catch (e) {
    return done(e)
  }

  if (validAddress.error) {
    return done(validAddress.error);
  }
  

  var locatorUrl = getLocatorUrl(validAddress)
  request.get(locatorUrl, function(err, res){
    if (err) return done(err);
    try {
      var body = JSON.parse(res.body);
      if (body.error) {
        body.error.status = body.error.status || body.error.code
        return done(body.error)
      }

      var repInfo = parseRepInfo(body);
      return done(null, repInfo)
    } catch(e) {
      return done(e);
    }
  })
}


/**
 * Takes hash of address fields and constructs request URL with them
 * to locate representatives 
 * @param {object} address - requested address. 
 *   String fields street, street2, city, state, zip
 * @returns {string} - Google Civic Data API request URL
 */
function getLocatorUrl(address) {
  var addressEncoded = encodeAddressObject(address);
  var requestUrl = [
    `https://www.googleapis.com/civicinfo/v2/representatives?`,
    `address=${addressEncoded}`,
    `&includeOffices=true`,
    `&levels=country`,
    `&&roles=legislatorLowerBody`,
    `&roles=legislatorUpperBody`,
    `&key=${API_KEY}`
  ].join('')
  return requestUrl;
}

/**
 * Processes address parameters and returns url-encoded address string 
 * @param {object} address - address object.
 *   String fields street, street2, city, state, zip
 * @returns {string} - URL Encoded address
 */
function encodeAddressObject(address) {
  for (key in address) {
    address[key] = address[key] || ""
  }
  
  var addressString = [
    address.street,
    address.street2,
    address.city,
    address.state,
    address.zip
  ].join(" ");
  
  return encodeURIComponent(addressString).replace(/%20/g, "+");
}


/**
 * Parses verbose rep info returned from Google API into simplified,
 * normalized format 
 */
function parseRepInfo(body) {
  var senateInfo, congressInfo
  body.offices.forEach(function(office){
    if (_.includes(office.roles, 'legislatorUpperBody')) {
      senateInfo = parseSenateInfo(office, body)
    }

    if (_.includes(office.roles, 'legislatorLowerBody')) {
      congressInfo = parseCongressInfo(office, body)
    }

  })
  
  return {
    state: senateInfo.state,
    congressionalDistrict: congressInfo.district,
    representative: congressInfo.representative,
    senators: senateInfo.senators
  }
}

function parseSenateInfo(office, fullInfo) {
  var divisionId = office.divisionId;
  var state = fullInfo.divisions[divisionId].name;
  var senators = _.map(office.officialIndices, function(idx){
    var senator = fullInfo.officials[idx]
    return {
      name: senator.name,
      phones: senator.phones
    }
  })
  return {
    state: state,
    senators: senators
  }
}

function parseCongressInfo(office, fullInfo) {
  var divisionId = office.divisionId;
  var district = fullInfo.divisions[divisionId].name;
  var officialIdx = office.officialIndices[0];
  var representative = fullInfo.officials[officialIdx]
  return {
    district: district,
    representative: {
      name: representative.name,
      phones: representative.phones
    }
  }
}


function validateAddress(query) {
  var params = _.pick(query, ['street', 'city', 'state', 'zip']);
  var errors = {};
  (['street', 'city', 'state', 'zip']).forEach(function(prop){
    if (!params[prop]) {
      errors[prop] = errors[prop] || [];
      errors[prop].push({
        code: 'MISSING_PARAM',
        message: `${prop} is a required query parameter`,
      })
    }
  })
  
  if (!_.isEmpty(errors)) {
    errors.status = 400;
    return { error: errors }
  }
  
  return params;
}



module.exports = {
  locate: locate
}
