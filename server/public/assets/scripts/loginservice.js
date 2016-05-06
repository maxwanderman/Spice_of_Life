angular.module('spiceApp').factory('LoginService', function($http){

  var postUser = function(user_name, password, zip_code){
    console.log('loginservice user_name', user_name);
    console.log(password);
    console.log(zip_code);
    $http.post('/createUser', {user_name: user_name, password: password, zip_code: zip_code}).then(function(response) {
      console.log(response);
      user_name = '';
      password = '';
      zip_code = '';
    });
  };

    return {
        postUser: postUser

    };
});
