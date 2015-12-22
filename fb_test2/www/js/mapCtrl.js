var map ;//地圖
var mymarker;//使用者位置插針
var messagemark = [];//所有發話插針
var mymessagemark = [];//使用者發話插針
var mymessagemarkcount = 0 ; //使用者發話插針數

angular.module('starter.mapCtrl', [] )

.controller('mapCtrl', function($scope, $ionicLoading, $compile,$state,$cordovaGeolocation,$ionicPopup, $timeout , myFactoryService) {
  $scope.rslt = myFactoryService.getData();
  console.log('currentuser', $scope.rslt);
  var options = {timeout: 10000, enableHighAccuracy: true};
 
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
    var latLng = new google.maps.LatLng(24.969417,121.267472);   
    var mylocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
    var mapOptions = {
      center: latLng,
      zoom: 17,
      streetViewControl: false,
      zoomControl: false,
      mapTypeControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    
       //Marker + infowindow + angularjs compiled ng-click
    var contentString = "<div><a ng-click='clickOnMarker()'>My Location</a></div>";
    var compiled = $compile(contentString)($scope);

    var infowindow = new google.maps.InfoWindow({
      content: compiled[0]
    });

    mymarker = new google.maps.Marker({
      position: mylocation,
      map: map,
      title: "This is a marker!",
      animation: google.maps.Animation.DROP
    });
    google.maps.event.addListener(mymarker, 'click', function() {
      infowindow.open(map,mymarker);
    });

    /*
    var markers = [];
    function setAllMap(map) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
      }
    }*/

    messagemark = [];
    var MessageObject = Parse.Object.extend("MessageObject");
    var query = new  Parse.Query(MessageObject); 
    query.find({
      success: function(results) {
       
        for (var i = 0; i < results.length; i++) {
          var markerlatLng = new google.maps.LatLng(results[i].get('position')["_latitude"],results[i].get('position')["_longitude"]);   
           
           //Marker + infowindow + angularjs compiled ng-click
          var contentString = "<div><a ng-click='clickOnMarker()'>" + results[i].get('message')+  "</a></div>";
          var compiled = $compile(contentString)($scope);

          var infowindow = new google.maps.InfoWindow({
            content: compiled[0]
          });


          messagemark[i] = new google.maps.Marker({
            position: markerlatLng,
            map: map,
            animation: google.maps.Animation.DROP
          });

          messagemark[i].setTitle((i + 1).toString());
          messagemark[i].setIcon('http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_blue.png');
            //marker.setMap(map); 
          google.maps.event.addListener(messagemark[i], 'click', (function(messagemark, i) {
            return function() {
              infowindow.setContent(results[i].get('message'));
              infowindow.open(map, messagemark);
            }
          })(messagemark[i], i));
       }
      },
      error: function(error) {
       alert("Error: " + error.code + " " + error.message);
      }
    });
    

    $scope.map = map;
  
  }, function(error){
    console.log("Could not get location");
  });


  google.maps.event.addDomListener(window, 'load');

//click on marker information
  $scope.clickOnMarker = function() {
        alert('Example of infowindow with ng-click')
  };


  $scope.RefreshData = function()
  {
    alert("Refresh");
    for(var i = 0 ; i < messagemark.length ; i++){
      messagemark[i].setMap(null);
    }
    for(var i = 0 ; i < mymessagemark.length ; i ++){
      mymessagemark[i].setMap(null);
    }
    messagemark = [];
    mymessagemark = [];
    mymessagemarkcount = 0 ;
    var MessageObject = Parse.Object.extend("MessageObject");
    var query = new  Parse.Query(MessageObject); 
    query.find({
      success: function(results) {
       
        for (var i = 0; i < results.length; i++) {
          var markerlatLng = new google.maps.LatLng(results[i].get('position')["_latitude"],results[i].get('position')["_longitude"]);   
           
           //Marker + infowindow + angularjs compiled ng-click
          var contentString = "<div><a ng-click='clickOnMarker()'>" + results[i].get('message')+  "</a></div>";
          var compiled = $compile(contentString)($scope);

          var infowindow = new google.maps.InfoWindow({
            content: compiled[0]
          });


          messagemark[i] = new google.maps.Marker({
            position: markerlatLng,
            map: map,
            animation: google.maps.Animation.DROP
          });

          messagemark[i].setTitle((i + 1).toString());
          messagemark[i].setIcon('http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_blue.png');
            //marker.setMap(map); 
          google.maps.event.addListener(messagemark[i], 'click', (function(messagemark, i) {
            return function() {
              infowindow.setContent(results[i].get('message'));
              infowindow.open(map, messagemark);
            }
          })(messagemark[i], i));
       }
      },
      error: function(error) {
       alert("Error: " + error.code + " " + error.message);
      }
    });
     
  };

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

      mymarker.setMap(null);    
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $scope.loading.hide();

      mylocation = new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude);
      mymarker = new google.maps.Marker({
        position: mylocation,
        map: map,
        title: "This is a marker!",
        animation: google.maps.Animation.DROP
      });
      
      
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
    var point;
    var NowPos;
    //讀取現在位置
    navigator.geolocation.getCurrentPosition(function(pos) {
      point = new Parse.GeoPoint({latitude: pos.coords.latitude , longitude:pos.coords.longitude});
      NowPos = new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude);
    }, function(error) {
      alert('Unable to get location: ' + error.message);
    });

    $scope.data = {}
   // An elaborate, custom popup
    $ionicPopup.show({
      templateUrl: 'popup-template.html',
      title: '新增訊息',
      cssClass: 'newMessage',
      scope: $scope,
      buttons: [
        { text: '取消'},
        {
          text: '<b>送出</b>',
          type: 'button-positive',
          onTap: function(e) {
            return $scope.data.message;
          }
        },
      ]
    }).then(function(res) {

      var MessageObject = Parse.Object.extend("MessageObject");
      var message = new MessageObject();
      message.set("position",point);
      message.set("username", $scope.rslt);
      message.set("message", res);
      message.save(null, {
        success: function (result){
          /*
          mymessagemark[mymessagemarkcount] = new google.maps.Marker({
            position: NowPos,
            map: map,
            title: "This is a marker!",//fix
            animation: google.maps.Animation.DROP
          });
          mymessagemark[mymessagemarkcount].setIcon('http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_blue.png');
          */
          var contentString = "<div><a ng-click='clickOnMarker()'>" + res+  "</a></div>";
          var compiled = $compile(contentString)($scope);

          var infowindow = new google.maps.InfoWindow({
            content: compiled[0]
          });


          mymessagemark[mymessagemarkcount] = new google.maps.Marker({
            position: NowPos,
            map: map,
            animation: google.maps.Animation.DROP
          });

          //mymessagemark[i].setTitle((i + 1).toString()); //fix
          mymessagemark[mymessagemarkcount].setIcon('http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_blue.png');

          google.maps.event.addListener(mymessagemark[mymessagemarkcount], 'click', (function(mymessagemark, mymessagemarkcount) {
            return function() {
              infowindow.setContent(res);
              infowindow.open(map, mymessagemark);
            }
          })(mymessagemark[mymessagemarkcount], mymessagemarkcount));

          alert("Success")
        },error: function (error){
          alert("ERROR")} 
        });
        console.log('message', res);
        alert(res);
    });
  };
     
  $scope.value = true; // position toggle button
  $scope.positionChange = function()
  {
    if($scope.value == false){
      $scope.value = true;
    }else
      $scope.value = false;
      alert('toggle: '+$scope.value);
  };  

  $scope.active = 'group';
  $scope.setActive = function(type) {
    alert(type);
    $scope.active = type;
  };
  $scope.isActive = function(type) {
    return type === $scope.active;
  };  

});