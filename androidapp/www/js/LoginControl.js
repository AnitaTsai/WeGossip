angular.module('starter.LoginControl', [])

.factory('myUser',function(){


    var UserAccout= "";

    return{
        setUserAccout:function(str){
            UserAccout = str;
        },

        getUserAccout:function(){
            return UserAccout;
        }
    }


})

.controller('LoginControl', function($scope , myUser) {
	$scope.data = {};

	//登入
	$scope.Login = function(){
    	Parse.User.logIn($scope.data.username, $scope.data.password, {
      		success: function(user) {
      			var CurrentUser = user;
        		if (CurrentUser.get("verified")){
              myUser.setUserAccout($scope.data.username);
        			alert("Welcome");
              setTimeout("location.href='#/app/MainPage'",0);
          			//setTimeout("location.href='#/MainPage'",0);
        		}else{
          			alert("You don't have verified yet!");
          			setTimeout("location.href='#/Verification'",0);
        		}
      		},error: function(user, error) {
      			// The login failed. Check error to see why.
        		alert("Erroe password or username!");
      		}
    	});
  	};

  	//註冊
  	$scope.Register=function(){
      if( (ValidateEmail($scope.data.email)) && (ValidatePWD($scope.data.password,$scope.data.confirm_password)) ){
        Parse.Cloud.run('register',{username:$scope.data.username,password:$scope.data.password,email:$scope.data.email},{
          success:function(result){
            alert(result);
            Parse.User.logIn($scope.data.username, $scope.data.password, {
                success: function(user) {
                  CurrentUser = user;
                },error: function(user, error) {
                  alert("Erroe password or username!");
                }
            });
            setTimeout("location.href='#/Verification'",0);
          },error:function(error){
            alert(error);
          }
        });
      }
  	}

  	//驗證
  	$scope.Check = function(){
    
    	if ($scope.data.emailverification==CurrentUser.get("verification")){
      		alert("success!!");
      		CurrentUser.set("verified",true);
      		CurrentUser.save(null,{}); 
          myUser.setUserAccout($scope.data.username); 
      		setTimeout("location.href='#/app/MainPage'",0);
    	}else{
      		alert("It is not verification number!!");
    	}
  	}

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

})