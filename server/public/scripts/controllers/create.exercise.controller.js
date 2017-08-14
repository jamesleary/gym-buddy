myApp.controller('CreateController', function($http,$location) {

  console.log('CreateController created');
  var cc = this;

  cc.editExercises = function(){
    console.log('go to edit page');
    $location.path('/createexercise/viewallexercises');
  };

  cc.getClasses = function (){
      console.log('click get exercise function');

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
      class: currentClass.class,
      exerciseName: exerciseName
    };
    $http.post('/createExercise', exerciseToSend).then(function(response) {
        console.log(response);
      });
      cc.getExercises();
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
    }, function(failure){
      console.log('something broke');
    });

  };
}); //end of create controller
