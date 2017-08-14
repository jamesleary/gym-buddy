myApp.controller('CreateWorkoutController', function($http,$location) {

  console.log('CreateWorkoutController created');
  var cw = this;



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

  


}); //end of create controller
