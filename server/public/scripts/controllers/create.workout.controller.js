myApp.controller('CreateWorkoutController', function($http,$location, $mdToast) {

  console.log('CreateWorkoutController created');
  var cw = this;

  completeWorkoutToast = function() {
    var toast = $mdToast.simple()
          .textContent('Workout Created!')
          .action('Click to view workouts')
          .position('top right')
          .hideDelay(10000);

          $mdToast.show(toast).then(function(response){
            if (response == 'ok'){
              $location.path('/createworkout/editworkout');
            }
          });
    };
    deleteWorkoutToast = function() {
      var toast = $mdToast.simple()
            .textContent('Workout deleted!')
            .action('Okay')
            .position('top right')
            .hideDelay(10000);

            $mdToast.show(toast).then(function(response){
              if (response == 'ok'){
                $location.path('/createworkout/editworkout');
              }
            });
      };
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
        completeWorkoutToast();
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
      deleteWorkoutToast();
    }, function(failure){
      console.log('something broke');
    });

  };


}); //end of create controller
