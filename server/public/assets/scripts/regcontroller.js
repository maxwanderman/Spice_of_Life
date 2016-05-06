app.controller('RegController', function(LoginService){
  var vm = this;

  vm.message = "Register";

  vm.user_name = '';
  vm.password = '';
  vm.zip_code = '';


  // vm.postUser = LoginService.postUser;
  vm.sendUser = function(){
    LoginService.postUser(vm.user_name, vm.password, vm.zip_code);
  }


});
