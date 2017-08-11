myApp.controller('CreateController', function($http,$location) {

  console.log('CreateController created');
  var cc = this;


  cc.getClasses = function (){
      console.log('click get exercise function');

      $http.get('/createExercise').then(function(response){
        console.log(response.data.classes);
        cc.classes = response.data.classes;
    });
  };
  cc.getClasses();


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
  cc.getExercises = function(){
    console.log('getExercises clicked');
    $http.get('/createExercise/exercise').then(function(response){
      console.log(response.data.exercises);
      cc.exerciseList = response.data.exercises;
  });
  };
  cc.getExercises();


  cc.editExercise = function(){

  };

  cc.deleteExercise = function(){

  };
}); //end of create controller
