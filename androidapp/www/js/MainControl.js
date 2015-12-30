var chattype = "resource";
angular.module('starter.MainControl', [])

.factory('MarkerCreatorService', function () {

    var markerId = 0;

    function create(latitude, longitude) {
        var marker = {
            options: {
                animation: 1,
                labelAnchor: "28 -5",
                labelClass: 'markerlabel'
            },
            message: '123',
            latitude: latitude,
            longitude: longitude,
            id: ++markerId
        };
        return marker;        
    }

    function invokeSuccessCallback(successCallback, marker) {
        if (typeof successCallback === 'function') {
            successCallback(marker);
        }
    }

    function createByCoords(latitude, longitude, successCallback) {
        var marker = create(latitude, longitude);
        invokeSuccessCallback(successCallback, marker);
    }

    function createByAddress(address, successCallback) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address' : address}, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                var firstAddress = results[0];
                var latitude = firstAddress.geometry.location.lat();
                var longitude = firstAddress.geometry.location.lng();
                var marker = create(latitude, longitude);
                invokeSuccessCallback(successCallback, marker);
            } else {
                alert("Unknown address: " + address);
            }
        });
    }

    function createByCurrentLocation(successCallback) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var marker = create(position.coords.latitude, position.coords.longitude);
                invokeSuccessCallback(successCallback, marker);
            });
        } else {
            alert('Unable to locate current position');
        }
    }

    return {
        createByCoords: createByCoords,
        createByAddress: createByAddress,
        createByCurrentLocation: createByCurrentLocation
    };

})



.controller('MainControl', function ( $scope,MarkerCreatorService, $ionicPopup, $timeout ,$compile, myUser) {

    MarkerCreatorService.createByCoords(24.969417,121.267472, function (marker) {
        marker.options.labelContent = 'Yuan Ze';
        $scope.autentiaMarker = marker;
    });
        
    $scope.address = '';

    $scope.map = {
        center: {
            latitude: $scope.autentiaMarker.latitude,
            longitude: $scope.autentiaMarker.longitude
        },
        zoom: 17,
        markers: [],
        control: {},
        options: {
            streetViewControl: false,
                zoomControl: false,
                mapTypeControl: false,
            scrollwheel: false
        }
    };
    
    $scope.map.markers.push($scope.autentiaMarker);

    
    

    var MessageObject = Parse.Object.extend("MessageObject");
    var query = new  Parse.Query(MessageObject); 
    query.find({
      success: function(results) {

        for (var i = 0; i < results.length; i++) {
     
          MarkerCreatorService.createByCoords(results[i].get('position')["_latitude"],results[i].get('position')["_longitude"], function (marker) {
            marker.options.labelContent = 'News!!';
            marker.options.Title =((i + 1).toString());
            if(results[i].get('type') == "resource"){
              marker.options.icon = 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_blue.png';
            }
            if(results[i].get('type') == "post"){
              marker.options.icon = 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_green.png';
            
            }
            if(results[i].get('type') == "help"){
              marker.options.icon = 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_red.png';
            }


            $scope.map.markers.push(marker);

            
            
          });
          
        }
      },
      error: function(error) {
       alert("Error: " + error.code + " " + error.message);
      }
    });
    
    

    $scope.addCurrentLocation = function () {
        MarkerCreatorService.createByCurrentLocation(function (marker) {
            marker.options.labelContent = 'You´re here';
            $scope.map.markers.push(marker);
            refresh(marker);
        });
    };
        
    $scope.addAddress = function() {
        var address = $scope.address;
        if (address !== '') {
            MarkerCreatorService.createByAddress(address, function(marker) {
                $scope.map.markers.push(marker);
                refresh(marker);
            });
        }
    };

    function refresh(marker) {
        $scope.map.control.refresh({latitude: marker.latitude,longitude: marker.longitude});
    }

    $scope.showAlert = function() {
       var alertPopup = $ionicPopup.alert({
         title: 'Don\'t eat that!',
         template: 'It might taste good'
       });

       alertPopup.then(function(res) {
         console.log('Thank you for not eating my delicious ice cream cone');
       });
     };

   $scope.showPopup = function() {
    $scope.data = {};
    var UserPosition;
    var myPopup = $ionicPopup.show({
      templateUrl: 'popup-template.html',
      title: '新增訊息',
      cssClass: 'newMessage',
      scope: $scope,
      buttons: [
        { text: '取消' },
        {
          text: '<b>送出</b>',
          type: 'button-positive',
          onTap: function(e) {
            return $scope.data.message;
          }
        },
      ]
    });

    myPopup.then(function(res) {

      if (res==null){
        console.log('meesage is null');
        return ;
      }

      console.log('message', res);
      alert(res);

      MarkerCreatorService.createByCurrentLocation(function (marker) {
        marker.options.labelContent = 'News!!';

        
        
        var latitude= marker.latitude;
        var longitude= marker.longitude;   
        alert("marker positionx" + latitude);
        alert("marker positiony" + longitude);
        UserPosition = new Parse.GeoPoint({latitude: marker.latitude , longitude:marker.longitude});
        alert(UserPosition);
        

        if(chattype == "resource"){
          marker.options.icon = 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_blue.png';
        }
        if(chattype == "post"){
          marker.options.icon = 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_green.png';
        }
        if(chattype == "help"){
          marker.options.icon = 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_red.png';
        }
          
        $scope.map.markers.push(marker);
        refresh(marker);
      });

      var MessageObject = Parse.Object.extend("MessageObject");
      var message = new MessageObject();
      message.set("position", UserPosition);
      message.set("username", myUser.getUserAccout()); //
      message.set("message", res);
      message.set("type", chattype);//
      message.save(null, {
        success: function (result){
                     
          alert("Success")
        },error: function (error){
          alert("ERROR")} 
      });
      
    });
  };

     $scope.active = 'resource';
  $scope.setActive = function(type) {
    if(type == "resource"){
      alert("change type to resource");
      chattype = type;
      console.log(chattype);
    }
    if(type == "post"){
      alert("change type to post");
      chattype = type;
      console.log(chattype);
    }
    if(type == "help"){
      alert("change type to help");
      chattype = type;
      console.log(chattype);
    }
    $scope.active = type;
  };
  $scope.isActive = function(type) {
    return type === $scope.active;
  };  
});