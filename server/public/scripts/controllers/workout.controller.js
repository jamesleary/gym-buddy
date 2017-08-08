myApp.controller('WorkoutController', function($http) {

  console.log('WorkoutController created');
  var wc = this;

  wc.getWorkout = function(){
    console.log('click get workout function');
    $http.get('/workouts').then(function(response){
      console.log(response);

    });
  };




}); //end of workout controller
