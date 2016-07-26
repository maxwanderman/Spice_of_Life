var pg = require('pg');


pg.defaults.ssl = true;
pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

  client
    .query('SELECT table_schema,table_name FROM information_schema.tables;')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });
});
// if (process.env.DATABASE_URL){
//   pg.defaults.ssl = true;
//   connectionString = process.env.DATABASE_URL;
// } else {
//   connectionString = 'postgres://localhost:5432/spiceOfLife';
// }


function initializeDB(){
  pg.connect(connectionString, function(err, client,done){
    if(err){
      console.log('Error connecting to DB!', err);
      process.exit(1);
    } else {
      var query = client.query(
      'CREATE TABLE IF NOT EXISTS users(' +
      'id SERIAL PRIMARY KEY,' +
      'user_name varchar(255) NOT NULL,' +
      'password varchar(255) NOT NULL,' +
      'zip_code varchar(255) NOT NULL)');

      var query2 = client.query('CREATE TABLE IF NOT EXISTS restaurant(' +
      'id SERIAL PRIMARY KEY,' +
      'restaurant_name varchar(255) NOT NULL)');

      var query3 = client.query('CREATE TABLE IF NOT EXISTS favRestaurant(' +
      'user_id INT REFERENCES users(id),' +
      'rest_id INT REFERENCES restaurant(id),'+
      'PRIMARY KEY (user_id, rest_id))');



      query.on('end', function(){
        console.log('successfully ensured user created');
        done();
      });
      query.on('error', function() {
        console.log('error creating users schema!');
        process.exit(1);
      });

      query2.on('end', function(){
        console.log('successfully added resturaunt');
        done();
      });
      query2.on('error', function() {
        console.log('error inputing resturaunt');
        process.exit(1);
      });
      query3.on('end', function(){
        console.log('success');
        done();
      });
      query3.on('error', function() {
        console.log('error');
        process.exit(1);
      });
    }
  });
}

module.exports.connectionString = connectionString;
module.exports.initializeDB = initializeDB;
