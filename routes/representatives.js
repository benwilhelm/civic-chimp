var express = require("express");
var router = express.Router();
var _ = require('lodash');
var representatives = require("../services/representatives");

router.get("/", function(req, res, next){
  var validatedQuery;
  try {
    validatedQuery = validateRepQuery(req.query);
  } catch (e) {
    return next(e)
  }

  if (validatedQuery.error) {
    return next(validatedQuery.error);
  }
  
  representatives.locate(validatedQuery, function(err, located){
    if (err) return next(err);
    res.json(located);
  })
})


function validateRepQuery(query) {
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

module.exports = router;
