var CurrentUser;
angular.module('starter.loginCtrl', [])

.factory('myFactoryService',function(){


    var data= "";

    return{
        setData:function(str){
            data = str;
        },

        getData:function(){
            return data;
        }
    }


})


//deal with login and signUp
.controller('LoginCtrl', function($scope, $state, $cordovaFacebook , myFactoryService) {
  $scope.data = {}; 

  

  $scope.Check = function(){
    
    if ($scope.data.emailverification==CurrentUser.get("verification")){
      alert("success!!");
      CurrentUser.set("verified",true); 
     // var parseFile = new Parse.File("myPhoto.png","http://files.parsetfss.com/673d9c47-c4ac-4a19-925c-fb660920c983/tfss-71ed696c-f3a4-4d4e-9050-74c4ffe3e793-4QFr3V4lTMqv6OoAqeAY_user.png");
      //parseFile.save().then(function() {
        //CurrentUser.set("profilepicture", parseFile);
        //console.log("Save sccess");
    // The file has been saved to Parse.
    //}, function(error) {
    // The file either could not be read, or could not be saved to Parse.
    //console.log("Save error");
    //});
      CurrentUser.save(null,{});  
      setTimeout("location.href='#/app/main'",0);
    }else{
      alert("It is not verification number!!");
    }
  }



  $scope.Register=function(){
    Parse.Cloud.run('register',{username:$scope.data.username,password:$scope.data.password,email:$scope.data.email},{
      success:function(result){
        alert(result);
        Parse.User.logIn($scope.data.username, $scope.data.password, {
          success: function(user) {
            CurrentUser = user;
          },
          error: function(user, error) {
            alert("Erroe password or username!");
          }
        });
        setTimeout("location.href='#/authentication'",0);
      },
      error:function(error){
        alert(error);
      }
    });
  }
//use email to signUp
  $scope.signupEmail = function(){

     //Create a new user on Parse
    if( (ValidateEmail($scope.data.email)) && (ValidatePWD($scope.data.password,$scope.data.confirm_password)) )
    {
      var user = new Parse.User();

      user.set("username", $scope.data.username);
      user.set("password", $scope.data.password);
      user.set("email", $scope.data.email);    
      // other fields can be set just like with Parse.Object
      user.set("somethingelse", "like this!");
      user.signUp(null, {
        success: function(user) {
            // login success
          alert("Success!");
            //帳號成功後自動跳回login 可接"location.href='#/login'",2000 則為2秒後自動跳回
            setTimeout("location.href='#/authentication'",0);
          },
          error: function(user, error) {
            // login fail
            alert("Error: " + error.code + " " + error.message);
          }
        });
    }
  };

// use email to login
  $scope.loginEmail = function(){
    Parse.User.logIn($scope.data.username, $scope.data.password, {
      success: function(user) {
      // Do stuff after successful login.
        myFactoryService.setData($scope.data.username);
        CurrentUser = user;
        console.log(user);
        if (CurrentUser.get("verified")){
          setTimeout("location.href='#/app/main'",0);
        }else{
          alert("You don't have verified yet!");
          setTimeout("location.href='#/authentication'",0);
          //setTimeout("location.href='#/app/main'",0);
        }
     //alert("Success!");
        
      },
      error: function(user, error) {
      // The login failed. Check error to see why.
        alert("Erroe password or username!");
      }
    });

  };

// use FB to login
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

    function ValidatePWD(pwd,confirm_pwd)    //檢查密碼格式和確認密碼
    {
     if (pwd.length >= 6)
      {
         if(pwd == confirm_pwd)
            return true;
         else
         {
            alert("You have entered an different password!")
            return false;
         }
      }
        alert("You have entered an invalid password!")
        return false;
    }



});
