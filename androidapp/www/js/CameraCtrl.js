angular.module('starter.CameraCtrl', ['ionic','ngCordova'] )

 .controller('CameraCtrl', function($scope, $cordovaCamera) 
 {
 	$scope.pictureUrl = 'http://placehold.it/300x300';
   $scope.takePhoto = function () {
   	alert("takePhoto");
                  var options = {
                    destinationType: Camera.DestinationType.DATA_URL,
                    encodingType: Camera.EncodingType.JPEG
                };
   
                   $cordovaCamera.getPicture(options)
                   .then(function (data) {
                    	alert("getPicture");
                    	console.log('camera data: ' + angular.toJson(data));
                        $scope.pictureUrl = "data:image/jpeg;base64," + data;
                    }, function (err) {
                        // An error occured. Show a message to the user
                        alert("error");
                        console.log('camera error: ' + angular.toJson(error));
                    });
                }
              $scope.choosePhoto = function () {
              	alert("choosePhoto");
                  var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };
   
                    $cordovaCamera.getPicture(options).then(function (imageData) {
                        $scope.imgURI = "data:image/jpeg;base64," + imageData;
                    }, function (err) {
                        // An error occured. Show a message to the user
                        alert(err);
                    });
                }
 });
