/*Plugins 'google-maps'*/
angular.module('starter', ['ionic','uiGmapgoogle-maps','starter.LoginControl','starter.MainControl','starter.CameraCtrl'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    Parse.initialize("40TN82PIVbkEbpfSWxWeJbKGsxFwOGHVSX8quGxT", "pKIjQYUXzc0e2tBy4Vy0rmZWhbacSeeTvkhQ6EKE");
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/SideMenu.html',
  })
  .state('Login', {
    url: '/Login',
    templateUrl: 'templates/Login.html',
    controller: 'LoginControl'
  })
  .state('SignUp', {
    url: '/SignUp',
    templateUrl: 'templates/SignUp.html',
    controller: 'LoginControl'
  })
  .state('Verification', {
    url: '/Verification',
    templateUrl: 'templates/Verification.html',
    controller: 'LoginControl'
  })
  .state('UploadPicture', {
    url: '/UploadPicture',
    templateUrl: 'templates/UploadPicture.html',
    controller: 'CameraCtrl'
  })
  .state('app.Profile', {
    url: '/Profile',
    views:{
      'menuContent':{
      templateUrl: 'templates/Profile.html',
      }
    }
  })  
  .state('app.MainPage', {
    url: '/MainPage',
    views: {
        'menuContent': {
        templateUrl: 'templates/MainPage.html',
        controller: 'MainControl'
      }
    }
  })


  $urlRouterProvider.otherwise("/Login");
})