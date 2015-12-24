var map ;//地圖
var mymarker;//使用者位置插針
var messagemark = [];//所有發話插針
var mymessagemark = [];//使用者發話插針
var mymessagemarkcount = 0 ; //使用者發話插針數
var chattype = "group";


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

    /*
    var pinIcon = new google.maps.MarkerImage(
      "img/4QFr3V4lTMqv6OoAqeAY_user.png" ,
      null, // size is determined at runtime 
      null, // origin is 0,0 
      null, // anchor is bottom center of the scaled image 
      new google.maps.Size(42, 42)
    );
    */
    /*    
    var goldStar = {
      path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
      fillColor: 'yellow',
      fillOpacity: 0.8,
      scale: 1,
      strokeColor: 'gold',
      strokeWeight: 14
    };
    */
    /*
    var mymarker2 = new google.maps.Marker({
      position: mylocation,
      map: map,
      title: "This is a marker!",
      animation: google.maps.Animation.DROP,
    /*
      //icon : pinIcon
      /*
      icon: {

          path: google.maps.SymbolPath.CIRCLE,
          strokeColor :'gold',
          scale: 10,
          
        },*/
    /*
      icon:{
        url: "img/4QFr3V4lTMqv6OoAqeAY_user.png" ,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      }

    });
    */
    mymarker = new google.maps.Marker({
      position: mylocation,
      map: map,
      title: "This is a marker!",
      animation: google.maps.Animation.DROP,
    });
    
    var cityCircle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      center: mylocation,
      radius:  100,
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

          if(results[i].get('type') == "group"){
            messagemark[i].setIcon('http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_blue.png');
          }
          if(results[i].get('type') == "help"){
            messagemark[i].setIcon('http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_red.png');
          }
          if(results[i].get('type') == "chat"){
            messagemark[i].setIcon('http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_green.png');
          }
          
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
          if(results[i].get('type') == "group"){
            messagemark[i].setIcon('http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_blue.png');
          }
          if(results[i].get('type') == "help"){
            messagemark[i].setIcon('http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_red.png');
          }
          if(results[i].get('type') == "chat"){
            messagemark[i].setIcon('http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_green.png');
          }
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
      if (res==null){
        console.log('meesage is null');
        return ;
      }
      var MessageObject = Parse.Object.extend("MessageObject");
      var message = new MessageObject();
      message.set("position",point);
      message.set("username", $scope.rslt);
      message.set("message", res);
      message.set("type",chattype);
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
          if(chattype == "group"){
            mymessagemark[mymessagemarkcount].setIcon('http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_blue.png');
          }
          if(chattype == "help"){
            mymessagemark[mymessagemarkcount].setIcon('http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_red.png');
          }
          if(chattype == "chat"){
            mymessagemark[mymessagemarkcount].setIcon('http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_green.png');
          }
          

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
    if(type == "group"){
      alert("change type to group");
      chattype = type;
      console.log(chattype);
    }
    if(type == "help"){
      alert("change type to help");
      chattype = type;
      console.log(chattype);
    }
    if(type == "chat"){
      alert("change type to chat");
      chattype = type;
      console.log(chattype);
    }
    $scope.active = type;
  };
  $scope.isActive = function(type) {
    return type === $scope.active;
  };  

});