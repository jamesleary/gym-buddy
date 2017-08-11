myApp.controller('WorkoutController', function($http) {

  console.log('WorkoutController created');
  var wc = this;

wc.setCurrentWorkout = function (){

};

wc.getWorkouts = function (){
    console.log('click get workout function');

    $http.get('/workouts').then(function(response){
      console.log(response.data.workouts);
      wc.workouts = response.data.workouts;
  });
};

wc.getWorkouts();

wc.postCompleteWorkout = function(currentWorkout){
  console.log('click post workout function', currentWorkout);
  $http.post('/workouts', currentWorkout).then(function(response) {
      console.log(response);
    });
    wc.getWorkouts();
};

}); //end of workout controller
