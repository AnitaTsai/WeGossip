// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngCordova'])


/*
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

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

})*/
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

    Parse.initialize("UPLMUZ0E5ru230VpEMBKTjfmBsv1vkQH2oEnpdy9", "jA2vO6HKMSMKFvCUkqiMgVvQSoM4DkVVNy6rskr6");

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

.controller('LoginCtrl', function($scope, $state, $cordovaFacebook) {

  $scope.data = {};

  $scope.signupEmail = function(){

     //Create a new user on Parse
    if( (ValidateEmail($scope.data.email)) && (ValidatePWD($scope.data.password)) )
    {
        var user = new Parse.User();

        user.set("username", $scope.data.username);
        user.set("password", $scope.data.password);
        user.set("email", $scope.data.email);

        // other fields can be set just like with Parse.Object
        user.set("somethingelse", "like this!");

        user.signUp(null, {
          success: function(user) {
            // Hooray! Let them use the app now.
            alert("Success!");
          },
          error: function(user, error) {
            // Show the error message somewhere and let the user try again.
            alert("Error: " + error.code + " " + error.message);
          }
        });
    }

  };


  $scope.loginEmail = function(){
    Parse.User.logIn($scope.data.username, $scope.data.password, {
    success: function(user) {
      // Do stuff after successful login.
      console.log(user);
      alert("Success!");
    },
    error: function(user, error) {
      // The login failed. Check error to see why.
      alert("error password or username!");
    }
  });

  };
/*
  $scope.loginFacebook = function(){

  $cordovaFacebook.login(["public_profile", "email"]).then(function(success){

    console.log(success);

  }, function(error){
    console.log(error);
  });

  };*/

  $scope.loginFacebook = function(){
alert("enter fb login");
  //Browser Login
  if(!(ionic.Platform.isIOS() || ionic.Platform.isAndroid())){
      alert("Browser login");
    Parse.FacebookUtils.logIn(null, {
      success: function(user) {
        console.log(user);
        if (!user.existed()) {
          alert("User signed up and logged in through Facebook!");
        } else {
          alert("User logged in through Facebook!");
        }
      },
      error: function(user, error) {
        alert("User cancelled the Facebook login or did not fully authorize.");
      }
    });

  }
  //Native Login
  else {
      alert("native login");
    $cordovaFacebook.login(["public_profile", "email"]).then(function(success){

      console.log(success);

      //Need to convert expiresIn format from FB to date
      var expiration_date = new Date();
      expiration_date.setSeconds(expiration_date.getSeconds() + success.authResponse.expiresIn);
      expiration_date = expiration_date.toISOString();

      var facebookAuthData = {
        "id": success.authResponse.userID,
        "access_token": success.authResponse.accessToken,
        "expiration_date": expiration_date
      };

      Parse.FacebookUtils.logIn(facebookAuthData, {
        success: function(user) {
          console.log(user);
          if (!user.existed()) {
            alert("User signed up and logged in through Facebook!");
          } else {
            alert("User logged in through Facebook!");
          }
        },
        error: function(user, error) {
          alert("User cancelled the Facebook login or did not fully authorize.");
        }
      });

    }, function(error){
      console.log(error);
    });

  }

};




    function ValidateEmail(mail)    //檢查信箱格式
    {
      var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

      if (!filter.test(mail))
      {
        alert('You have entered an invalid email!');
        email.focus;
        return false;
      }
      else
        return true;

    }
    function ValidatePWD(pwd)    //檢查密碼格式
    {
     if (pwd.length >= 6)
      {
        return (true)
      }
        alert("You have entered an invalid password!")
        return (false)
    }

});
