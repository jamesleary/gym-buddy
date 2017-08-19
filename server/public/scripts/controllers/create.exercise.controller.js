myApp.controller('CreateController', function($http,$location,$scope, $mdToast) {

  console.log('CreateController created');
  var cc = this;

  createExerciseToast = function() {
    var toast = $mdToast.simple()
          .textContent('Exercise Created!')
          .action('Click to view exercises')
          .position('top right')
          .hideDelay(10000);

          $mdToast.show(toast).then(function(response){
            if (response == 'ok'){
              $location.path('/createexercise/viewallexercises');
            }
          });
    };
    deleteExerciseToast = function() {
      var toast = $mdToast.simple()
            .textContent('Exercise deleted!')
            .action('Okay')
            .position('top right')
            .hideDelay(10000);

            $mdToast.show(toast).then(function(response){
              if (response == 'ok'){
                $location.path('/createexercise/viewallexercises');
              }
            });
      };
  cc.openMenu = function($mdMenu, ev) {
    originatorEv = ev;
    $mdMenu.open(ev);
  };
  cc.editExercises = function(){
    console.log('go to edit page');
    $location.path('/createexercise/viewallexercises');
  };

  cc.getClasses = function (){
    console.log('click get classes function');

    $http.get('/createExercise').then(function(response){
      console.log(response.data.classes);
      cc.classes = response.data.classes;
    });
  };
  cc.getClasses();

  cc.getExercises = function(){
    console.log('getExercises clicked');
    $http.get('/createExercise/exercise').then(function(response){
      console.log(response.data.exercises);
      cc.exerciseList = response.data.exercises;
    });
  };
  cc.getExercises();

  cc.postExercises = function(currentClass, exerciseName){
    console.log('click post exercise function', currentClass.class, exerciseName);
    var exerciseToSend = {
      class: currentClass,
      exerciseName: exerciseName
    };
    $http.post('/createExercise', exerciseToSend).then(function(response) {
      console.log(response);
    });
    cc.getExercises();
    createExerciseToast();
  };

  cc.editExercise = function(updateExercise){
    console.log('edit click', updateExercise);
    $http.put('/createExercise/update/'+ updateExercise.id, updateExercise).then(function(response){
      console.log('edit successful');
    });
    cc.getExercises();
  };

  cc.deleteExercise = function(selectedExercise){
    console.log('delete click', selectedExercise.id);
    $http.delete('/createExercise/'+ selectedExercise.id).then(function(response){
      console.log('exercise got deleted, Nice');
      cc.getExercises();
      deleteExerciseToast();
    }, function(failure){
      console.log('something broke');
    });

  };
}); //end of create controller
