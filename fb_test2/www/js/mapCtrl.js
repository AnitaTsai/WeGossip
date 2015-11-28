angular.module('starter.mapCtrl', [])

    .controller('mapCtrl', function($scope, $ionicLoading, $compile,$state,$cordovaGeolocation,$ionicPopup, $timeout) 
    {
      var options = {timeout: 10000, enableHighAccuracy: true};
 
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
    var latLng = new google.maps.LatLng(24.969417,121.267472);   
    var myLatLng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
    var mapOptions = {
      center: latLng,
      zoom: 17,
      streetViewControl: false,
      zoomControl: false,
      mapTypeControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: "This is a marker!",
    animation: google.maps.Animation.DROP
  });
    $scope.map = map;
  
  }, function(error){
    console.log("Could not get location");
  });

  $scope.centerOnYZU = function() {
        if(!$scope.map) {
          return;
        }

        $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.map.setCenter(new google.maps.LatLng(24.969417,121.267472));
          $scope.loading.hide();
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
   };

  $scope.centerOnMe = function() {
        if(!$scope.map) {
          return;
        }

        $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          $scope.loading.hide();
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
   };

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
   $ionicPopup.show({
              templateUrl: 'popup-template.html',
              title: '<font color="0000ff">New message</font>',
              scope: $scope,
              buttons: [
                { text: 'Cancel'},
                {
                  text: '<b>Save</b>',
                  type: 'button-positive',
                  onTap: function(e) {
                    return $scope.data.message;
                  }
                },
              ]
              }).then(function(res) {
                console.log('Tapped!', res);
                alert(res);
              });
  };

});