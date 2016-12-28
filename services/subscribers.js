var assert  = require('assert');
var request = require("request");

assert(process.env.MC_API_KEY, "No MailChimp API Key set (MC_API_KEY)")
assert(process.env.MC_LIST_ID, "No MailChimp List ID set (MC_LIST_ID)")

const MC_API_KEY    = process.env.MC_API_KEY;
const MC_LIST_ID    = process.env.MC_LIST_ID;
const MC_DATACENTER = getDataCenterFromApiKey(MC_API_KEY);
const MC_URL_BASE   = `https://${MC_DATACENTER}.api.mailchimp.com/3.0`;

module.exports = {
  
  apiUrlBase: function() {
    return MC_URL_BASE;
  },
  
  subscribe: function(email, mergeFields, done) {
    var url = `${MC_URL_BASE}/lists/${MC_LIST_ID}/members`
    request.post(url, {
      body: {
        email_address: email,
        status: 'subscribed',
        email_type: 'html',
        merge_fields: normalizeMergeFields(mergeFields)
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

function normalizeMergeFields(mergeFields) {
  mergeFields.US_REP_PHO = normalizePhone(mergeFields.US_REP_PHO);
  mergeFields.US_SEN1_PH = normalizePhone(mergeFields.US_SEN1_PH);
  mergeFields.US_SEN2_PH = normalizePhone(mergeFields.US_SEN2_PH);
  return mergeFields;
}

function normalizePhone(ph) {
  if (!ph) return "";
  
  ph = ph.replace(/[^\d]/g, '');
  if (ph[0] === '1') {
    ph = ph.substr(1)
  }
  
  if (ph.length != 10) return "";
  
  var a = ph.substr(0, 3);
  var b = ph.substr(3, 3);
  var c = ph.substr(6, 4);
  
  return `${a}-${b}-${c}`
} 
