
angular.module('starter.historyCtrl', [] )
 .controller('historyCtrl', function($scope, $ionicLoading, $compile,$state, $timeout , myFactoryService) 
 {
$scope.rslt = myFactoryService.getData();

     //$scope.gethistory = function() {
     //alert('trigger gethistory()');
    var MessageObject = Parse.Object.extend("MessageObject");
    var query = new  Parse.Query(MessageObject);
 
    query.equalTo("username", $scope.rslt);
    query.find({
      success: function(results) {
       // alert("Successfully retrieved " + results.length + " msgs.");
      
        $scope.msgs = [];
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          //alert(object.id + ' - ' + object.get('message'));
        // $scope.mes = object.get('message');
         //console.log(results[i].get('message'));
          
            
            $scope.msgs.push(results[i].get('message') );
           
        }
      },
      error: function(error) {
       alert("Error: " + error.code + " " + error.message);
      }
    });
  //};


 });