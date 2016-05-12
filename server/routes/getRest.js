var router = require('express').Router();
var path = require('path');
var requestMod = require('request');


router.get('/:lat/:lng', function(request, response){
  var lat = request.params.lat;
  var lng = request.params.lng;
  requestMod({
    uri:'https://developers.zomato.com/api/v2.1/search?count=15&lat=' + lat + '&lon=' + lng + '&radius=8046',
    method: 'GET',
    // headers: {'user-key': process.env.key}
    headers: {'user-key': 'de2870035b8371bee2d70bb8c0698ed4'}
  }, function(err, res, body){
    if (err){
      response.sendStatus(500);
    } else {
      // console.log(body);
      response.send(body);
    }
  });
});

module.exports = router;
