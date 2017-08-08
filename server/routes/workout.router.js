var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool.js');
var pg = require('pg');

router.get('/', function(req, res){
  console.log('inside workout GET');
  //error connecting is boolean, db is what we query against
  //done is a function that we can when we're done
  // console.log('Pool info: ', pool);

  pool.connect(function(errorConnectingToDatabase, db, done){

    if(errorConnectingToDatabase){
      console.log('Error connecting to the database.', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      //we connected to the database!!!
      //Now we're going to GET all workouts created by logged in User.
      // var queryText = 'SELECT * FROM workouts';
      // errorMakingQuery is a boolean, result is an object
      db.query('SELECT * FROM workoutz', function(errorMakingQuery, result){
        done();
        if(errorMakingQuery){
          console.log('Attempted to query with', errorMakingQuery);
          // console.log('Error making query');
          res.sendStatus(500);
        } else {
          // console.log(result);
          //send back the results
          res.send({workouts: result.rows});
        }
      });
    }
  });


});

module.exports = router;
