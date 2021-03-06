const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');
const app = express();
const config = require('./config/config');
app.set('port', process.env.PORT || 5000);

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err);
  require('./app/routes')(app, database);
  app.listen(app.get('port'), () => {
    console.log('We are live on ' + app.get('port'));
  });
});
