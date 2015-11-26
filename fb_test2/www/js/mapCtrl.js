angular.module('starter.mapCtrl', [])

    .controller('mapCtrl', function($scope, $state, $cordovaGeolocation,$ionicPopup, $timeout) 
    {
      var options = {timeout: 10000, enableHighAccuracy: true};
 
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
  
  }, function(error){
    console.log("Could not get location");
  });

  $scope.showAlert = function() {
   var alertPopup = $ionicPopup.alert({
      title: 'Ionic Popup',
      template: 'This is alert popup',
   });

   alertPopup.then(function(res) {
      console.log('Thanks');
   });
  };

  $scope.showPopup = function() {
   $scope.data = {}
   // An elaborate, custom popup
   $ionicPopup.prompt({
   title: 'New Message',
   template: 'Enter message',
   inputType: 'text',
   inputPlaceholder: 'Your message...'

 }).then(function(res) {
   console.log('Your message is', res);
   alert(res);
 });
  
  };
});