myApp.controller('WorkoutController', function($http) {

  console.log('WorkoutController created');
  var wc = this;


wc.getWorkouts = function (){
    console.log('click get workout function');

    $http.get('/workouts').then(function(response){
      console.log(response.data.workouts);
      wc.workouts = response.data.workouts;
  });
};

wc.getWorkouts();


}); //end of workout controller
