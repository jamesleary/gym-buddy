myApp.controller('WorkoutController', function($http, $scope, $mdToast, $location) {

  console.log('WorkoutController created');
  var wc = this;

  showSimpleToast = function() {
    var toast = $mdToast.simple()
          .textContent('Workout Completed!')
          .action('Okay')
          .position('top right')
          .hideDelay(10000);

          $mdToast.show(toast).then(function(response){
            if (response == 'ok'){
              $location.path('/user');
            }
          });
    };
    errorToast = function() {
      var toast = $mdToast.simple()
            .textContent('Something went wrong, please reload the page and try again')
            .action('Okay')
            .position('top right')
            .hideDelay(10000);

            $mdToast.show(toast).then(function(response){
              if (response == 'ok'){
                $location.path('/workout');
              }
            });
      };
    wc.openMenu = function($mdMenu, ev) {
         originatorEv = ev;
         $mdMenu.open(ev);
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
      showSimpleToast();
      wc.getWorkouts();
    },function errorCallback(response){
      console.log('error toast');
      errorToast();
    });
  };

}); //end of workout controller
