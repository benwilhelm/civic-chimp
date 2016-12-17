var express = require("express");
var router = express.Router();
var _ = require('lodash');
var respService = require("../services/response");
var representatives = require("../services/representatives");

router.get("/", function(req, res){
  var validatedQuery;
  try {
    validatedQuery = validateRepQuery(req.query);
  } catch (e) {
    return respService.fiveHundred(res, e)
  }

  if (validatedQuery.error) {
    return respService.fourHundred(res, validatedQuery.error)
  }
  
  representatives.locate(validatedQuery, function(err, located){
    if (err) return respService.fiveHundred(res, err);
    res.json(located);
  })
})


function validateRepQuery(query) {
  var params = _.pick(query, ['street1', 'street2', 'city', 'state', 'zip']);
  var errors = {};
  (['street1', 'city', 'state', 'zip']).forEach(function(prop){
    if (!params[prop]) {
      errors[prop] = errors[prop] || [];
      errors[prop].push({
        code: 'MISSING_PARAM',
        message: `${prop} is a required query parameter`,
      })
    }
  })
  
  if (!_.isEmpty(errors)) {
    return { error: errors }
  }
  
  return params;
}

module.exports = router;
