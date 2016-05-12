var express = require('express');
var index = require('./routes/index');
var bodyParser = require('body-parser');
var createUser = require('./routes/createUser');
var listEditor = require('./routes/listEditor');
var getZip = require('./routes/getZip');
var getRest = require('./routes/getRest');
var initializeDB = require('./db/list').initializeDB;
var localStrategy = require('passport-local').Strategy;
var passport = require('passport');
var session = require('express-session');
var encryptLib = require('../modules/encryption');
var users = require('./routes/users');
var pg = require('pg');
var app = express();

//configs
app.use(express.static('server/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//passport
app.use(session({
   secret: 'puppy time',
   resave: true,
   saveUninitialized: false,
   cookie: { maxAge: 60000, secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use('local', new localStrategy({
       passReqToCallback : true,
       usernameField: 'user_name'
   },
function(req, username, password, done){
  console.log('called local');
    pg.connect(connectionString, function (err, client) {

      console.log('called local - pg');

      var user = {};

        var query = client.query("SELECT * FROM users WHERE user_name = $1", [username]);

        query.on('row', function (row) {
          console.log('User obj', row);
          console.log('Password', password);
          user = row;
          if(encryptLib.comparePassword(password, user.password)){
            console.log('match!');
            done(null, user);
          } else {
            done(null, false, { message: 'Incorrect username and password.' });
          }

        });

        // After all data is returned, close connection and return results
        query.on('end', function () {
            client.end();
        });

        // Handle Errors
        if (err) {
            console.log(err);
        }
    });

}));
 passport.serializeUser(function(user, done) {
   done(null, user.id);
});

passport.deserializeUser(function(id, done) {
      console.log('called deserializeUser');
      pg.connect(connectionString, function (err, client) {

        var user = {};
        console.log('called deserializeUser - pg');
          var query = client.query("SELECT * FROM users WHERE id = $1", [id]);

          query.on('row', function (row) {
            console.log('User row', row);
            user = row;
            done(null, user);
          });

          // After all data is returned, close connection and return results
          query.on('end', function () {
              client.end();
          });

          // Handle Errors
          if (err) {
              console.log(err);
          }
      });

});


//routes
app.use('/', index);
app.use('/createUser', createUser);
app.use('/users', users);
app.use('/listEditor', listEditor);
app.use('/getZip', getZip);
app.use('/getRest', getRest);

initializeDB();

var server = app.listen(process.env.PORT || 3000, function(){
  var port = server.address().port;

  console.log('Listening on port 3000', port, 'ctrl-c to stop server');
});
