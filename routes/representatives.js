var express = require("express");
var router = express.Router();
var _ = require('lodash');
var representatives = require("../services/representatives");

router.get("/", function(req, res, next){
  representatives.locate(req.query, function(err, located){
    if (err) return next(err);
    res.json(located);
  })
})

module.exports = router;
