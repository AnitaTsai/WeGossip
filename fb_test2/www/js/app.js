// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngCordova','starter.loginCtrl','starter.mapCtrl' ,'ngIOS9UIWebViewPatch'])

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
    
    Parse.initialize("0ekcDIcYCDRfF3rLy4yo5JVmqdOxPe7o4fyMCYCh", "HXaKOjKo77cU6SnC8tYdm5uECwDAqPbUPiAiOytd");

    if(!(ionic.Platform.isIOS() || ionic.Platform.isAndroid())){
      window.fbAsyncInit = function() {
          Parse.FacebookUtils.init({
              appId      : '1481027875536884',
              version    : 'v2.5',
              xfbml      : true
          });
      };

      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));
    }

  });
})


.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  /*.state('home' ,{
    url:'/'
    templateUrl:'index.html',
    controller:'LoginCtrl'
  })*/
  
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/sidemenu.html',
    
  })

  .state('authentication',{
    url:'/authentication',
    templateUrl:'templates/authentication.html',
    controller: 'LoginCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'LoginCtrl'
  })
  .state('forgetPassword', {
    url: '/forgetPassword',
    templateUrl: 'templates/forgetPassword.html',
    controller: 'LoginCtrl'
  })
 
 .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

.state('app.profile', {
    url: '/profile',
    views:{
      'menuContent':{
      templateUrl: 'templates/profile.html',
      }
    }
  })

  .state('app.upload_picture', {
    url: '/upload_picture',
    views:{
      'menuContent':{
      templateUrl: 'templates/upload_picture.html',
      }
    }
  })

 .state('app.friends', {
    url: '/friends',
    views:{
      'menuContent':{
      templateUrl: 'templates/friends.html',
      }
    }
  })
 .state('app.history', {
    url: '/history',
    views:{
      'menuContent':{
      templateUrl: 'templates/history.html',
      }
    }
  })
 .state('app.settings', {
    url: '/settings',
    views:{
      'menuContent':{
      templateUrl: 'templates/settings.html',
      }
    }
  })
  
  .state('app.main', {
      url: '/main',
      views: {
           'menuContent': {
          templateUrl: 'templates/main.html',
          controller: 'mapCtrl'
        }
      }
  });
 /*
  .state('main', {
   url: '/main',
   templateUrl: 'templates/main.html',
   controller: 'LoginCtrl'
   
 });*/

  $urlRouterProvider.otherwise("/login");

});
