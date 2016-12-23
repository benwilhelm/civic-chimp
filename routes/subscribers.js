var express = require('express');
var router = express.Router();

var subscribers = require('../services/subscribers');

/** 
 * Subscribe user to MailChimp
 */
router.post('/', function(req, res, next) {
  var email = req.body.email;
  var zip   = req.body.zip;
  
  subscribers.subscribe(email, {
    ZIP: zip
  }, function(err, r){
    if (err) return res.error(err)
    // console.log(r)
    res.json(r)
  })
});

module.exports = router;
