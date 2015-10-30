// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {
 
  $stateProvider
  /*.state('home' ,{
    url:'/'
    templateUrl:'index.html',
    controller:'LoginCtrl'
  })*/
  .state('login', {
    url: '/',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })
  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'LoginCtrl'
  })

   .state('signin', {
    url: '/signin',
    templateUrl: 'templates/signin.html',
    controller: 'LoginCtrl'
  });
 
  $urlRouterProvider.otherwise("/");
 
})
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
 
    Parse.initialize("jxTHg7qyIxvJUj10JI88BpQMldks4IAP7vLX0HH3", "ML8KDW04M9GMwijQ3d1W7hzGBBOXCZUkdTFVCO2B");
 
  });
})

.controller('LoginCtrl', function($scope, $state) {
 
  $scope.data = {};
 
  $scope.signupEmail = function(){  

     //Create a new user on Parse
  var user = new Parse.User();
  user.set("username", $scope.data.username);
  user.set("password", $scope.data.password);
  user.set("email", $scope.data.email);
 
  // other fields can be set just like with Parse.Object
  user.set("somethingelse", "like this!");
 
  user.signUp(null, {
    success: function(user) {
      // Hooray! Let them use the app now.
      alert("success!");
    },
    error: function(user, error) {
      // Show the error message somewhere and let the user try again.
      alert("Error: " + error.code + " " + error.message);
    }
  });

 
  };
 
  $scope.loginEmail = function(){
    Parse.User.logIn($scope.data.username, $scope.data.password, {
    success: function(user) {
      // Do stuff after successful login.
      console.log(user);
      alert("success!");
    },
    error: function(user, error) {
      // The login failed. Check error to see why.
      alert("error!");
    }
  });
 
  };
 
});