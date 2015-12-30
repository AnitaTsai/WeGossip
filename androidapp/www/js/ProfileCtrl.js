angular.module('starter.ProfileCtrl', ['ionic'] )

 .controller('ProfileCtrl', function($scope,myUser) 
 {
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

 	var PictureObject = Parse.Object.extend("ProfilePictures");
 	var query2 = new  Parse.Query(PictureObject);
 	query2.equalTo("username", currentUser);
 	query2.find({
	      success: function(results) {
	      //console.log(results[0].get('profilepic')['_url']);	          
	          $scope.imgURI = results[0].get('profilepic')['_url'];
	        },
	      error: function(error) {
	       alert("Error: " + error.code + " " + error.message);
	      }
	    });

 	$scope.SaveData = function()
 	{
 		
 	};
 });