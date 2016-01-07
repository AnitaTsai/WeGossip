angular.module('starter.ProfileControl', ['ionic'] )

 .controller('ProfileCtrl', function($scope,myUser) 
 {
 	$scope.data = {};
 	var currentUser = myUser.getUserAccout();
 	$scope.UserName = currentUser;
 	
 	var UserObject = Parse.Object.extend("User");
 	var query = new  Parse.Query(UserObject);
 	query.equalTo("username", currentUser);
 	query.find({
	      success: function(results) {
	          $scope.UserEmail = results[0].get('email');
	        },
	      error: function(error) {
	       alert("Error: " + error.code + " " + error.message);
	      }
	    });

 	
 });