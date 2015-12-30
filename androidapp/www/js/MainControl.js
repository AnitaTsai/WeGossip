var chattype = "resource";
var uploadpic = "";
var ID = 0;
angular.module('starter.MainControl', ['ionic','ngCordova'])


.controller('MainControl', function ( $scope, $ionicPopup, $cordovaGeolocation,$timeout ,$cordovaCamera,myUser) {
    $scope.map = {  
      center: { latitude: 24.969417, longitude: 121.267472},
      options: {
        streetViewControl: false,
        zoomControl: false,
        mapTypeControl: false,
        scrollwheel: true //滾輪
        },
        control: {},
        refresh:{},
        zoom: 17 
      };

    $scope.User = {
      coords: { latitude: 24.969417, longitude: 121.267472 },
      id : -1,
      options:{
        animation: 1,
        labelContent : 'Me',
      },
    };

    /*
    $scope.marker = {
      coords: { latitude: 24.969417, longitude: 121.267472 },
      id : 1,
      options:{
        icon:'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_blue.png'
      },
    };
    $scope.title = "Window Title!";
    */

    $scope.Markers=[];
    /*
    var marker ={
      latitude:24.969417,
      longitude:121.267472,
      id:100,
      options:{
        animation: 1,
        labelContent : 'Me',
      },
    };
    $scope.Markers.push(marker);
    */

    var MessageObject = Parse.Object.extend("MessageObject");
    var query = new  Parse.Query(MessageObject); 
    query.find({
      success: function(results) {

        for (var i = 0; i < results.length; i++) {
          var messagetype = "resource";
          if(results[i].get('type') == "resource"){
            messagetype =  '<h1 style="color:blue;">物資</h1>';
          }
          if(results[i].get('type') == "post"){
            messagetype = '<h1 style="color:green;">通報</h1>';
          }
          if(results[i].get('type') == "help"){
            messagetype = '<h1 style="color:red;">求助</h1>';
          }
          var marker ={
            latitude: results[i].get('position')['_latitude'],
            longitude: results[i].get('position')['_longitude'],
            id:ID,
            title: messagetype  + '<p>來自: ' +results[i].get('username') + '</p>' 
                                               + '<p>內容: ' + results[i].get('message') + '</p>'
                                               + '<img src="' + results[i].get('photo')['_url'] + '"style="width:150px;height:150px;">',
            options:{
              icon:''
            },
          };
          ID++;

            
          if(results[i].get('type') == "resource"){
            marker.options.icon = 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_blue.png';
          }
          if(results[i].get('type') == "post"){
            marker.options.icon = 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_green.png'; 
          }
          if(results[i].get('type') == "help"){
            marker.options.icon = 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_red.png';
          }
            

          $scope.Markers.push(marker);
        }
      },
      error: function(error) {
       alert("Error: " + error.code + " " + error.message);
      }
    });
    
    $scope.RefreshData = function(){
      $scope.Markers = [];
      ID = 0;

      var MessageObject = Parse.Object.extend("MessageObject");
      var query = new  Parse.Query(MessageObject); 
      query.find({
        success: function(results) {

          for (var i = 0; i < results.length; i++) {
            var messagetype = "resource";
              if(results[i].get('type') == "resource"){
                messagetype =  '<h1 style="color:blue;">物資</h1>';
              }
              if(results[i].get('type') == "post"){
                messagetype = '<h1 style="color:green;">通報</h1>';
              }
              if(results[i].get('type') == "help"){
                messagetype = '<h1 style="color:red;">求助</h1>';
              }

            var marker ={
              latitude: results[i].get('position')['_latitude'],
              longitude: results[i].get('position')['_longitude'],
              id:ID,
              title: messagetype  + '<p>來自: ' +results[i].get('username') + '</p>' 
                                               + '<p>內容: ' + results[i].get('message') + '</p>'
                                              + '<img src="' + results[i].get('photo')['_url'] + '"style="width:150px;height:150px;">',
              options:{
                icon:''
              },
            };
            ID++;

              
            if(results[i].get('type') == "resource"){
              marker.options.icon = 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_blue.png';
            }
            if(results[i].get('type') == "post"){
              marker.options.icon = 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_green.png';
              
            }
            if(results[i].get('type') == "help"){
              marker.options.icon = 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_red.png';
            }
              

            $scope.Markers.push(marker);
          }
        },
        error: function(error) {
         alert("Error: " + error.code + " " + error.message);
        }
      });
    }


    $scope.centerOnMe = function()
    {
       navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.map.control.refresh({latitude: pos.coords.latitude, longitude: pos.coords.longitude});
          $scope.User = {
            coords: { latitude: pos.coords.latitude, longitude: pos.coords.longitude },
            id : -1,
            options:{
            animation: 1,
            labelContent : 'Me',
          },
    };
        }, function(error) {
          alert('Unable to get location: ' + error.message);
      });
    }
    $scope.centerOnYZU = function()
    {
        $scope.map.control.refresh({latitude: 24.969417, longitude: 121.267472});
    }

    $scope.onClick = function(marker, eventName, model) {
      console.log("Clicked!");
      model.show = !model.show;
    };

    $scope.imgURI = '';
      $scope.takePhoto = function () {
        alert("mainPhoto");
                  var options = {
                    destinationType: Camera.DestinationType.DATA_URL,
                    allowEdit: true,
                    targetWidth: 200,
                    targetHeight: 200,
                    encodingType: Camera.EncodingType.PNG
                };
   
                   $cordovaCamera.getPicture(options)
                   .then(function (data) {
                    //  alert("getPicture");
                      console.log('camera data: ' + angular.toJson(data));
                        $scope.imgURI = "data:image/png;base64," + data;
                        uploadpic = data;
                    }, function (err) {
                        // An error occured. Show a message to the user
                        alert("error");
                    });
      }

     
    $scope.showAlert = function() {
       var alertPopup = $ionicPopup.alert({
         title: '實用災情通報電話',
         template: '桃園縣應變中心: (03)3377662 桃園市公所: (03)3349581'
       });

       alertPopup.then(function(res) {
         //console.log('Thank you for not eating my delicious ice cream cone');
       });
     };

   $scope.showPopup = function() {
    $scope.data = {};
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

      var MessageObject = Parse.Object.extend("MessageObject");
      var message = new MessageObject();
      var positionx ;
      var positiony ;


      navigator.geolocation.getCurrentPosition(function(pos) {
        message.set("position", new Parse.GeoPoint({latitude: pos.coords.latitude , longitude:pos.coords.longitude}));
        positionx = pos.coords.latitude;
        positiony = pos.coords.longitude;
      }, function(error) {
        alert('Unable to get location: ' + error.message);
      });
      
      message.set("username", myUser.getUserAccout()); //
      message.set("message", res);
      message.set("type", chattype);//
       var parseFile = new Parse.File('messagePhoto.png',{base64:uploadpic});                    
      message.set("photo",parseFile);
      message.save(null, {
        success: function (result){        
          alert("Success");
          var marker ={
            latitude:positionx,
            longitude: positiony,
            id:ID,
            title: res,
            options:{
              icon:''
            },
          };
          ID++;
          if(chattype == "resource"){
            marker.options.icon = 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_blue.png';
          }
          if(chattype == "post"){
            marker.options.icon = 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_green.png'; 
          }
          if(chattype == "help"){
            marker.options.icon = 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_red.png';
          }
          $scope.map.control.refresh({latitude: positionx, longitude: positiony});
          $scope.Markers.push(marker);

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