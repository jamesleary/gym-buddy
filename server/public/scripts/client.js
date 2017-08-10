var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'moment-picker']);

/// Routes ///
myApp.config(function($routeProvider, $locationProvider,momentPickerProvider) {
  $locationProvider.hashPrefix('');
  momentPickerProvider.options({
      /* Picker properties */
      locale:        'en',
      format:        'LL',
      minView:       'decade',
      maxView:       'minute',
      startView:     'year',
      autoclose:     true,
      today:         true,
      keyboard:      false,

      /* Extra: Views properties */
      leftArrow:     '&larr;',
      rightArrow:    '&rarr;',
      yearsFormat:   'YYYY',
      monthsFormat:  'MMM',
      daysFormat:    'D',
      hoursFormat:   'HH:[00]',
      minutesFormat: moment.localeData().longDateFormat('LT').replace(/[aA]/, ''),
      secondsFormat: 'ss',
      minutesStep:   5,
      secondsStep:   1
  });
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
      controller: 'ViewCompleteController as vc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/completeworkout/selected', {
      templateUrl: '/views/templates/completeworkoutselect.html',
      controller: 'ViewCompleteController as vc',
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
