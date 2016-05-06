var router = require('express').Router();
var path = require('path');
var pg = require('pg');

var connectionString = require('../db/list').connectionString;

router.post('/', function(request, response){
  pg.connect(connectionString, function(err, client, done){
    if (err){
      console.log(err);
      response.sendStatus(500);
    } else {
      // console.log('got the stuff');
      var result = [];
      console.log('Request body is: ', request.body);
      var user_name = request.body.user_name;
      var password = request.body.password;
      var zip_code = request.body.zip_code;
      // console.log(request.body);

      var query = client.query('INSERT INTO users (user_name, password, zip_code) VALUES ($1, $2, $3)' +
      'RETURNING id, user_name, password, zip_code', [user_name, password, zip_code]);

      query.on('row', function(row){
        result.push(row);
      });
      query.on('end', function() {
        done();
        response.send(result);
      });

      query.on('error', function(error) {
        console.log('error running query:', error);
        done();
        response.status(500).send(error);

      });
    }
  });
});

module.exports = router;
