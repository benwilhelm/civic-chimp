var assert  = require('assert');
var request = require("request");

assert(process.env.MC_API_KEY, "No MailChimp API Key set (MC_API_KEY)")
assert(process.env.MC_LIST_ID, "No MailChimp List ID set (MC_LIST_ID)")

const MC_API_KEY    = process.env.MC_API_KEY;
const MC_LIST_ID    = process.env.MC_LIST_ID;
const MC_DATACENTER = getDataCenterFromApiKey(MC_API_KEY);
const MC_URL_BASE   = `https://${MC_DATACENTER}.api.mailchimp.com/3.0`;

module.exports = {
  
  subscribe: function(email, mergeFields, done) {
    var url = `${MC_URL_BASE}/lists/${MC_LIST_ID}/members`
    request.post(url, {
      body: {
        email_address: email,
        status: 'subscribed',
        email_type: 'html',
        merge_fields: mergeFields
      },
      json: true,
      auth: {
        user: 'doesntmatter',
        pass: MC_API_KEY
      }
    }, done)
  }
}

function getDataCenterFromApiKey(apiKey) {
  assert(apiKey, "no apiKey provided")
  var a = apiKey.split('-');
  return a[a.length - 1];
}
