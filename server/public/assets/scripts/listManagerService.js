angular.module('spiceApp').factory('ListManagerService', function($http, $location){

  var listData = {};
  var restList = [];

  var postRestaurant = function(restaurant_name){
    $http.post('/listEditor', {restaurant_name: restaurant_name}).then(function(response) {
      console.log(response);
    });
  };

  var getRestaurant = function (){
    $http.get('/listEditor').then(function(response){
      listData.info = response.data;
      });
    };

    var getRestList = function (){
      $http.get('/listEditor').then(function(response){
        restList.info = response.data;
        });
      };

  return {
    postRestaurant: postRestaurant,
    getRestaurant: getRestaurant,
    listData: listData,
    getRestList: getRestList,
    restList: restList
  };

});
