angular.module('spiceApp').factory('randomRestService', function($http, $location){

  var resultZip = {};
  var resultRest = [];
  var finalChoice = {};
  var lat = '';
  var lng = '';

  var surpriseME = function(zip_code){
    $http.get('/getZip/' + zip_code).then(function(response){
      resultZip = response.data;
      lat = resultZip.lat;
      lng = resultZip.lng;
      getRest(lat, lng);


    });
  };

  var getRest = function(lat, lng){
    $http.get('/getRest/' + lat + '/' + lng).then(function(response){
      resultRest = response.data.restaurants;
      console.log(resultRest);
      shuffle(resultRest);
      finalChoice.info = resultRest[0];
      console.log(finalChoice);

    });
};

shuffle = function(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

  return {
    surpriseME : surpriseME,
    finalChoice: finalChoice
  };

});
