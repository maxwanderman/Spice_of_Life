angular.module('spiceApp').factory('ListManagerService', function($http, $location){

  var listData = {};

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

  return {
    postRestaurant: postRestaurant,
    getRestaurant: getRestaurant,
    listData: listData
  };

});
