var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool.js');
var pg = require('pg');

router.get('/', function(req, res){
  console.log('inside complete workout GET');
  //error connecting is boolean, db is what we query against
  //done is a function that we can when we're done
  // console.log('Pool info: ', pool);
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase){
      console.log('req.user.id', req.user.id);
      console.log('Error connecting to the database.', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      //we connected to the database!!!
      //Now we're going to GET all workouts created by logged in User.
      // var queryText = 'SELECT * FROM workouts';
      // errorMakingQuery is a boolean, result is an object
      var queryText = 'SELECT * FROM "complete_workout"  WHERE user_id = $1;;' ;
      db.query(queryText,[req.user.id],function(errorMakingQuery, result){
        done();
        if(errorMakingQuery){
          console.log('Attempted to query with', errorMakingQuery);
          // console.log('Error making query');
          res.sendStatus(500);
        } else {
          // console.log(result);
          //send back the results
          res.send({completeWorkouts: result.rows});
        }
      });
    }
  });
});//end of get


router.delete('/:id', function(req, res){
  var id = req.params.id;
  console.log('Delete', id);
    //error connecting is boolean, db is what we query against
    //done is a function that we can when we're done
    pool.connect(function(errorConnectingToDatabase, db, done){
      if(errorConnectingToDatabase){
        console.log('Error connecting to the database.');
        res.sendStatus(500);
      } else {
        //we connected to the database!!!
        //Now we're going to GET things from the db
        var queryText = 'DELETE FROM "complete_workout" WHERE id = $1';
        // errorMakingQuery is a boolean, result is an object
        db.query(queryText, [id], function(errorMakingQuery, result){
          done();
          if(errorMakingQuery){
            console.log('Attempted to query with', queryText);
            console.log('Error making query');
            res.sendStatus(500);
          } else {
            // console.log(result);
            //send back the results
            res.sendStatus(200);
          }
        });
      }
    });
});



module.exports = router;
