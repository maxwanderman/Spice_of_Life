var router = require('express').Router();
var path = require('path');
var pg = require('pg');
var passport = require('passport');
var encryptLib = require('../../modules/encryption');

var connectionString = require('../db/list').connectionString;

router.get('/', function(request, response, next){
   response.sendFile(path.resolve(__dirname, '../public/views/register.html'));
});

router.post('/', function(request, response){
  pg.connect(connectionString, function(err, client, done){
    if (err){
      console.log(err);
      response.sendStatus(500);
    } else {
      var result = [];
      console.log('Request body is: ', request.body);

      var registerUser = {
        user_name: request.body.user_name,
        password: encryptLib.encryptPassword(request.body.password),
        zip_code: request.body.zip_code
      };

      var query = client.query('INSERT INTO users (user_name, password, zip_code) VALUES ($1, $2, $3)' +
      'RETURNING id, user_name, password, zip_code', [registerUser.user_name, registerUser.password, registerUser.zip_code]);

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
