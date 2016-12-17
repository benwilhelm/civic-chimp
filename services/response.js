module.exports = {

  fourHundred: function(res, err){
    // console.error(err)
    res.status(400).json({
      error: err
    })
  },
  
  fourOhOne: function(res, err) {
    console.error(err)
    res.sendStatus(401)
  },
  
  fourOhThree: function(res, err) {
    console.error(err)
    res.sendStatus(403)
  },

  fiveHundred: function(res, err){
    console.error(err)
    res.sendStatus(500)
  }
}
