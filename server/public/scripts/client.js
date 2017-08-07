var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial']);

/// Routes ///
myApp.config(function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  console.log('myApp -- config');
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'LoginController as lc',
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController as lc'
    })
    .when('/user', {
      templateUrl: '/views/templates/user.html',
      controller: 'UserController as uc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/workout', {
      templateUrl: '/views/templates/workout.html',
      controller: 'WorkoutController as wc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }

    })
    .when('/createworkout', {
      templateUrl: '/views/templates/createworkout.html',
      controller: 'CreateController as cc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }

    })
    .when('/createexercise', {
      templateUrl: '/views/templates/createexercise.html',
      controller: 'CreateController as cc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }

    })
    .when('/completeworkout', {
      templateUrl: '/views/templates/completeworkout.html',
      controller: 'ViewcompleteController as vc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }

    })
    .otherwise({
      redirectTo: 'home'
    });
});
