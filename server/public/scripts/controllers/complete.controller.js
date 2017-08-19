myApp.controller('ViewCompleteController', function($http,$location, CompleteWorkoutService, $mdToast) {

  console.log('ViewCompleteController created');
  var vc = this;
  vc.data = CompleteWorkoutService.data;

  deleteSelectedToast = function() {
    var toast = $mdToast.simple()
          .textContent('Selected Workout deleted!')
          .action('Okay')
          .position('top right')
          .hideDelay(10000);

          $mdToast.show(toast).then(function(response){
            if (response == 'ok'){
              $location.path('/completeworkout');
            }
          });
    };
  vc.openMenu = function($mdMenu, ev) {
       originatorEv = ev;
       $mdMenu.open(ev);
     };
//Retrieve all completed workouts by logged in user
vc.getCompleteWorkouts = function (){
    console.log('click get workout function');
    $http.get('/complete').then(function(response){
      console.log(response.data.completeWorkouts);
      vc.completeWorkouts = response.data.completeWorkouts;
  });
};
//delete seleted workout on clicking x button
vc.deleteCompletedWorkout = function (selectedWorkout) {
  console.log('Delete Button Clicked', selectedWorkout);
  $http.delete('/complete/'+ selectedWorkout.id).then(function(response){
    console.log('things got deleted, Nice');
    vc.getCompleteWorkouts();
    deleteSelectedToast();
  }, function(failure){
    console.log('something broke');
  });
};

vc.getCompleteWorkouts();

//function allows user to view a single completed workout on seperate view,
//spcifically this function is reassigning the selected workout index from
//completed workout view and databinds that certain workout to be viewed on
// completeworkoutselect.html view
vc.getCompleteSelectedWorkout= function(selectedWorkout) {
  console.log('Select Button Clicked', selectedWorkout);
  vc.data.selectedWorkout = selectedWorkout;
  $location.path('/completeworkout/selected');
};


}); //end of workout controller
