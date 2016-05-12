angular.module('spiceApp').factory('randomRestService', function($http, $location){


  var getZip = function(zip_code){
    $http.get('/getZip/' + zip_code).then(function(response){
      console.log(response);
    });
  };

  return {
    getZip: getZip
  };

});
