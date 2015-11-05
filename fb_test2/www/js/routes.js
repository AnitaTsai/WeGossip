angular.module('starter.routes', [])

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
  .state('sidemenu', {
    url: '/loginCtrl',
    abstract: true,
    templateUrl: 'templates/sidemenu.html',
    controller: 'LoginCtrl'
  })
  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'LoginCtrl'
  })

   .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

   .state('sidemenu.main', {
      url: '/main',
      views: {
           'menuContent': {
          templateUrl: 'templates/main.html',
          controller: 'LoginCtrl'
        }
      }
    });

 /* .state('main', {
   url: '/main',
   templateUrl: 'templates/main.html',
   controller: 'LoginCtrl'
   
 });
*/
  $urlRouterProvider.otherwise("/login");

})
