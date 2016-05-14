var router = require('express').Router();
var path = require('path');
var pg = require('pg');
var passport = require('passport');


var connectionString = require('../db/list').connectionString;

var userID = '';

router.get('/', function(request, response) {
  pg.connect(connectionString, function(err, client, done){
    if (err){
      console.log(err);
      response.sendStatus(500);
    } else {
      userID = request.user.id;
      console.log(userID);
      // var query = client.query('SELECT rest_id FROM favrestaurant WHERE user_id = (user_id) VALUES($1)' +
      // 'RETURNING id, user_id', [request.user.id]);
      var query = client.query('SELECT restaurant.restaurant_name FROM restaurant JOIN favrestaurant ON favrestaurant.rest_id = restaurant.id WHERE favrestaurant.user_id = ' + userID + ';');
      var results = [];
      query.on('error', function(err){
        console.log(err);
        done();
        response.sendStatus(500);
      });
      query.on('row', function(rowData){
        results.push(rowData);
      });
      query.on('end', function(){
        response.send(results);
        done();
      });
    }
  });
});


router.post('/', function(request, response){
  pg.connect(connectionString, function(err, client, done){
    if (err){
      console.log(err);
      response.sendStatus(500);
    } else {
      var result = [];
      console.log('Request body is: ', request.body);

      var restaurant_name = request.body.restaurant_name;

      var query = client.query('INSERT INTO restaurant (restaurant_name) VALUES ($1)' +
      'RETURNING id, restaurant_name', [restaurant_name],
        function(err, result){
          if (err) {
            console.log('Error will robinson', err);
          } else {
            userID = request.user.id;
            client.query('INSERT INTO favrestaurant (user_id, rest_id) VALUES ($1, $2)' +
          'RETURNING user_id, rest_id', [userID, result.rows[0].id],
          function(err, result){
            if(err){
              response.status(500).send(error);
            } else {
              response.sendStatus(200);
            }
          });
          }
        });
    }
  });
});

router.delete('/:id', function(request, response){
  console.log(request.params.id);
  pg.connect(connectionString, function(err, client, done){
    if(err) {
      console.log(err);
      response.sendStatus(500);
    }else {
      var id = request.params.id;
      console.log(request.params.id);
      var query = client.query('DELETE FROM favrestaurant WHERE rest_id =' + id + ' AND user_id =' + request.user.id + 'RETURNING *');
      var results = [];
      query.on('error', function(error){
        console.log(error);
        response.sendStatus(500);
      });
      query.on('row', function(rowData){
        results.push(rowData);
      });
      query.on('end', function(){
        response.send(results);
        done();
      });
    }
  });
});

module.exports = router;
