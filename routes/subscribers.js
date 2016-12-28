var express = require('express');
var router = express.Router();
var _ = require('lodash')

var subscribers = require('../services/subscribers');

/** 
 * Subscribe user to MailChimp
 */
router.post('/', function(req, res, next) {
  var valid;
  try {
    valid = validateSubscriberQuery(req.body);
  } catch (e) {
    return next(e);
  }

  if (valid.error) {
    return next(valid.error);
  }

  subscribers.subscribe(valid.email, valid.mergeFields, function(err, r){
    if (err) return next(err)
    r = validateSubscribeResponse(r);
    res.status(r.status).json(r.body)
  })
});


function validateSubscriberQuery(query) {
  var params = _.pick(query, ['email', 'mergeFields']);
  var errors = {};
  (['email']).forEach(function(prop){
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

function validateSubscribeResponse(resp) {
  if (!resp.status || resp.status === 200) {
    return { 
      status: 200,
      body: {
          email: resp.email_address 
      }
    };
  } 
  
  var statusCode = resp.title.toUpperCase().replace(/ /g, "_");
  return {
    status: resp.status,
    body: {
      error: {
        STATUS_CODE: statusCode,
        message: resp.title
      }
    }
  }
}

module.exports = router;
