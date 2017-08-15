myApp.controller('CreateWorkoutController', function($http,$location) {

  console.log('CreateWorkoutController created');
  var cw = this;

  cw.goToEditWorkouts = function (){
    $location.path('/createworkout/editworkout');
  };

  cw.getExercises = function (){
      console.log('click get exercise function');

      $http.get('/createExercise/exercise').then(function(response){
        console.log(response.data.exercises);
        cw.exerciseList = response.data.exercises;
    });
  };
  cw.getExercises();



  cw.createNewWorkout = function(workoutToSend){
    console.log('click post workout function');

    $http.post('/createWorkout', workoutToSend).then(function(response) {
        console.log(response);
      });

  };



  cw.getWorkouts = function () {
    console.log('inside getWorkouts');
    $http.get('/workouts').then(function(response){
      console.log(response.data.workouts);
      cw.workouts = response.data.workouts;
    });
  };

  cw.getWorkouts();


  cw.deleteWorkout = function(selectedWorkout){
    console.log('delete click', selectedWorkout.id);
    $http.delete('/createworkout/'+ selectedWorkout.id).then(function(response){
      console.log('workout deleted, Nice');
      cw.getWorkouts();
    }, function(failure){
      console.log('something broke');
    });

  };


}); //end of create controller
