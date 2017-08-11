var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool.js');
var pg = require('pg');

router.get('/', function(req, res){
  console.log('inside GET classes');
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
      var queryText = 'SELECT * FROM "classes"' ;
      db.query(queryText,function(errorMakingQuery, result){
        done();
        if(errorMakingQuery){
          console.log('Attempted to query with', errorMakingQuery);
          // console.log('Error making query');
          res.sendStatus(500);
        } else {
          // console.log(result);
          //send back the results
          res.send({classes: result.rows});
        }
      });
    }
  });
});//end of get

router.post('/', function(req, res){
  console.log('inside POST exercise');
  var exercise = req.body;
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
      var queryText = 'INSERT INTO "exercises" (class, exercise_name, user_id) VALUES ($1,$2,$3);' ;
      db.query(queryText,[exercise.class, exercise.exerciseName, req.user.id],function(errorMakingQuery, result){
        done();
        if(errorMakingQuery){
          console.log('Attempted to query with', errorMakingQuery);
          // console.log('Error making query');
          res.sendStatus(500);
        } else {
          // console.log(result);
          //send back the results
          res.send({exercise: result.rows});
        }
      });
    }
  });
});
// router.delete('/:id', function(req, res){
//   var id = req.params.id;
//   console.log('Delete', id);
//     //error connecting is boolean, db is what we query against
//     //done is a function that we can when we're done
//     pool.connect(function(errorConnectingToDatabase, db, done){
//       if(errorConnectingToDatabase){
//         console.log('Error connecting to the database.');
//         res.sendStatus(500);
//       } else {
//         //we connected to the database!!!
//         //Now we're going to GET things from the db
//         var queryText = 'DELETE FROM "complete_workout" WHERE id = $1';
//         // errorMakingQuery is a boolean, result is an object
//         db.query(queryText, [id], function(errorMakingQuery, result){
//           done();
//           if(errorMakingQuery){
//             console.log('Attempted to query with', queryText);
//             console.log('Error making query');
//             res.sendStatus(500);
//           } else {
//             // console.log(result);
//             //send back the results
//             res.sendStatus(200);
//           }
//         });
//       }
//     });
// });

router.get('/exercise', function(req, res){
  console.log('inside GET exercise');
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
      var queryText = 'SELECT * FROM "exercises" JOIN "users" ON "users"."id" = "exercises"."user_id" WHERE "users"."id" = $1;' ;
      db.query(queryText,[req.user.id],function(errorMakingQuery, result){
        done();
        if(errorMakingQuery){
          console.log('Attempted to query with', errorMakingQuery);
          // console.log('Error making query');
          res.sendStatus(500);
        } else {
          // console.log(result);
          //send back the results
          res.send({exercises: result.rows});
        }
      });
    }
  });
});

module.exports = router;
