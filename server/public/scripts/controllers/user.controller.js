myApp.controller('UserController', function(UserService, $http) {

  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;

getMotivationalQuotes = function(){
  console.log('random quote will load');
  $http.get('/workouts/randomQuote').then(function(response){
    console.log(response.data.quote);
    vm.quote = response.data.quote;
});
};
getMotivationalQuotes();
});
