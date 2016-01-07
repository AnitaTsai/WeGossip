var uploadpic = "";
angular.module('starter.CameraCtrl', ['ionic','ngCordova'] )


 .controller('CameraCtrl', function($scope, $cordovaCamera,myUser) 
 {
            
 	$scope.imgURI = 'http://placehold.it/300x300';
             $scope.takePhoto = function () {
                  var options = {
                    destinationType: Camera.DestinationType.DATA_URL,
                    allowEdit: true,
                    targetWidth: 300,
                    targetHeight: 300,
                    encodingType: Camera.EncodingType.PNG
                };
   
                   $cordovaCamera.getPicture(options)
                   .then(function (data) {
                    //	alert("getPicture");
                    	console.log('camera data: ' + angular.toJson(data));
                        $scope.imgURI = "data:image/png;base64," + data;
                        uploadpic = data;
                    }, function (err) {
                        // An error occured. Show a message to the user
                        alert("error");
                    });
                }
              $scope.choosePhoto = function () {
              	//alert("choosePhoto");
                  var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.PNG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };
   
                    $cordovaCamera.getPicture(options).then(function (imageData) {
                        $scope.imgURI = "data:image/png;base64," + imageData;
                        uploadpic = imageData;
                    }, function (err) {
                        // An error occured. Show a message to the user
                        alert(err);
                    });
                }

                $scope.uploadPhoto = function(){
                    var currentUser = myUser.getUserAccout();
                    var post = Parse.Object.extend("ProfilePictures");                    
                    var newPost = new post();
                    newPost.set("username",currentUser);      
                    var parseFile = new Parse.File('mypic.png',{base64:uploadpic});                    
                    newPost.set("profilepic",parseFile);
                    newPost.save(null,{
                                       success: function(){
                                           // do whatever
                                           alert("success");
                                         },
                                    error: function(error){
                                        // do whatever 
                                            alert(error);
                                        }
                                    });
                    }

 });