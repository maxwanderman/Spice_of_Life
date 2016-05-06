var express = require('express');
var index = require('./routes/index');
var bodyParser = require('body-parser');
var createUser = require('./routes/createUser');
var initializeDB = require('./db/list').initializeDB;
var app = express();

//configs
app.use(express.static('server/public'));
app.use(bodyParser.json());


//routes
app.use('/', index);
app.use('/createUser', createUser);

initializeDB();

var server = app.listen(process.env.PORT || 3000, function(){
  var port = server.address().port;

  console.log('Listening on port 3000', port, 'ctrl-c to stop server');
});
