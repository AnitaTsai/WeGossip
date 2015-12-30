var chattype = "resource";
var uploadpic = "";
angular.module('starter.MainControl', ['ionic','ngCordova'])


.controller('MainControl', function ( $scope, $ionicPopup, $timeout ,$cordovaCamera,myUser) {

    $scope.map = { 
      center: { latitude: 24.969417, longitude: 121.267472 },
      options: {
            streetViewControl: false,
                zoomControl: false,
                mapTypeControl: false,
            scrollwheel: false
        },
       zoom: 17 
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

      /*function uploadPhoto(){
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
      }*/

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

      var MessageObject = Parse.Object.extend("MessageObject");
      var message = new MessageObject();

      MarkerCreatorService.createByCurrentLocation(function (marker) {
        marker.options.labelContent = 'News!!';

        
        message.set("position", new Parse.GeoPoint({latitude: marker.latitude , longitude:marker.longitude}));
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

      
      
      message.set("username", myUser.getUserAccout()); //
      message.set("message", res);
      message.set("type", chattype);//
       var parseFile = new Parse.File('messagePhoto.png',{base64:uploadpic});                    
      message.set("photo",parseFile);
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