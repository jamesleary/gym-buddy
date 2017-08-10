myApp.controller('ViewCompleteController', function($http, CompleteWorkoutService) {

  console.log('ViewCompleteController created');
  var vc = this;
  vc.data = CompleteWorkoutService.data;

//Retrieve all completed workouts by logged in user
vc.getCompleteWorkouts = function (){
    console.log('click get workout function');

    $http.get('/complete').then(function(response){
      console.log(response.data.completeWorkouts);
      vc.completeWorkouts = response.data.completeWorkouts;
  });
};
vc.getCompleteWorkouts();

//function allows user to view a single completed workout on seperate view,
//spcifically this function is reassigning the selected workout index from
//completed workout view and databinds that certain workout to be viewed on
// completeworkoutselect.html view
vc.getCompleteSelectedWorkout= function(selectedWorkout) {
console.log(vc.data);
  vc.data.selectedWorkout = selectedWorkout;
};

//Delete Selected workout
vc.deleteCompletedWorkout = function () {
  console.log('Delete Button Clicked');

vc.getCompleteWorkouts();
};

}); //end of workout controller
