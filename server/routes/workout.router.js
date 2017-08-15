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
      console.log('req.user.id', req.user.id);
      console.log('Error connecting to the database.', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      //we connected to the database!!!
      //Now we're going to GET all workouts created by logged in User.
      // var queryText = 'SELECT * FROM workouts';
      // errorMakingQuery is a boolean, result is an object
      var queryText = 'SELECT * FROM "workouts" WHERE "user_id" = $1';
      db.query(queryText,[req.user.id],function(errorMakingQuery, result){
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
});//end of get

router.post('/', function(req, res){
  var cw = req.body;
  console.log(cw);
  //error connecting is boolean, db is what we query against
  //done is a function that we can when we're done
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase){
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      //we connected to the database!!!
      //Now we're going to POST comepleted Workout to the DB
      var queryText = 'INSERT INTO "complete_workout"(name, exercise_one,exercise_two,exercise_three,exercise_four,'+
                      'exercise_five,exercise_six,reps_one,reps_two,reps_three,reps_four,reps_five,reps_six,user_id,weight_one,' +
                      'weight_two,weight_three,weight_four,weight_five,weight_six,unique_name,workout_date,workout_notes)' +
                      'VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23)';
      // errorMakingQuery is a boolean, result is an object
      db.query(queryText, [cw.name, cw.exercise_one, cw.exercise_two, cw.exercise_three, cw.exercise_four, cw.exercise_five, cw.exercise_six,
        cw.reps_one, cw.reps_two, cw.reps_three, cw.reps_four, cw.reps_five, cw.reps_six,req.user.id, cw.weight_one, cw.weight_two, cw.weight_three, cw.weight_four,
        cw.weight_five, cw.weight_six, cw.uniqueWorkout, cw.workoutDate, cw.workoutNotes], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery){
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {

          //send back the results
          res.sendStatus(200);
        }
      });
    }
  });
});

router.get('/randomQuote', function(req, res){
  console.log('get randomQuote');
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
      var queryText = 'SELECT "quote" FROM "quotes" ORDER BY RANDOM() LIMIT 1';
      db.query(queryText, function(errorMakingQuery, result){
        done();
        if(errorMakingQuery){
          console.log('Attempted to query with', errorMakingQuery);
          // console.log('Error making query');
          res.sendStatus(500);
        } else {
          // console.log(result);
          //send back the results
          res.send({quote: result.rows});
        }
      });
    }
  });
});

module.exports = router;
