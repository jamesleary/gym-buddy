myApp.controller('ViewCompleteController', function($http) {

  console.log('ViewCompleteController created');
  var vc = this;

//Retrieve all completed workouts by logged in user
vc.getCompleteWorkouts = function (){
    console.log('click get workout function');

    $http.get('/complete').then(function(response){
      console.log(response.data.completeWorkouts);
      vc.completeWorkouts = response.data.completeWorkouts;
  });
};
vc.getCompleteWorkouts();

vc.getCompleteSelectedWorkout= function(index) {
  // vc.selectedCompleteWorkout = vc.comepletearray[index];
};

//Delete Selected workout
vc.deleteCompletedWorkout = function () {
  console.log('Delete Button Clicked');

};
}); //end of workout controller
