var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

router.get('/', function(request, response, next) {
   response.send(request.isAuthenticated());
});

router.get('/getUser', function(request, response){
  response.send(request.user);
});

router.post('/', passport.authenticate('local', {
  successRedirect: '/users/success',
  failureRedirect: '/users/failure'
}));

router.get('/success', function(request, response) {
  console.log(request.user);
  console.log('User is logged in:' , request.isAuthenticated());
  // response.sendStatus(200);
  response.send(request.user);
});

router.get('/failure', function(request, response) {
  response.sendStatus(401);
});

router.get('/logout', function(request, response){
  request.logout();
  response.redirect('/');
});

module.exports = router;
