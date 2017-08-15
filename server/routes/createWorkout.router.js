var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool.js');
var pg = require('pg');
var passport = require('passport');

router.post('/', function(req, res){
  console.log('inside POST workout', req.body);
  var workout = req.body;
  var workoutId = req.user.id;
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
      //POST into exercise table
      var queryText = 'INSERT INTO "workouts" (name, exercise_one,exercise_two,exercise_three,exercise_four,exercise_five,exercise_six,reps_one,reps_two,reps_three,reps_four,reps_five,reps_six,user_id)' +
                        'VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14);' ;
      db.query(queryText,[workout.workout_name, workout.workout_one.exercise_name,workout.workout_two.exercise_name,workout.workout_three.exercise_name,workout.workout_four.exercise_name,
        workout.workout_five.exercise_name,workout.workout_six.exercise_name,workout.reps_one,
      workout.reps_two,workout.reps_three,workout.reps_four,workout.reps_five,workout.reps_six, workoutId],function(errorMakingQuery, result){
        done();
        if(errorMakingQuery){
          console.log('Attempted to query with', errorMakingQuery);
          // console.log('Error making query');
          res.sendStatus(500);
        } else {
          // console.log(result);
          //send back the results
          res.send({workout: result.rows});
        }
      });
    }
  });
});
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
        var queryText = 'DELETE FROM "workouts" WHERE id = $1';
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
