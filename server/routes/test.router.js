var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool.js');
var pg = require('pg');

var config = {};

var pool = new pg.Pool(config);

router.get('/wtf', function(req, res) {
  res.send('hi');

});

router.get('/', function(req, res) {
  console.log('test route');
  pool.connect(function(errorConnectingToDatabase, db, done){
  if(errorConnectingToDatabase){
    console.log('Error connecting to the database.', errorConnectingToDatabase);
    res.sendStatus(500);
  } else {
    //we connected to the database!!!
    //Now we're going to GET things from the db
    var queryText = 'SELECT * FROM users';
    // errorMakingQuery is a boolean, result is an object
    db.query(queryText, function(errorMakingQuery, result){
      done();
      if(errorMakingQuery){
        console.log('Attempted to query with', errorMakingQuery);
        res.sendStatus(500);
      } else {
        console.log('yay! results: ', result);
        //send back the results
        res.send({stuff: result.rows});
      }
    });
  }
});
});


module.exports = router;
