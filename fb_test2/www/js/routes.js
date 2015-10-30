angular.module('routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  /*.state('home' ,{
    url:'/'
    templateUrl:'index.html',
    controller:'LoginCtrl'
  })*/
  /*
  .state('login', {
    url: '/',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
})*/
  .state('signups', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'LoginCtrl'
  })

   .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  });

  $urlRouterProvider.otherwise("/login");

})
