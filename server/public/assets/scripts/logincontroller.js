app.controller('LoginController', function(LoginService){
  var vm = this;
  vm.message = "Login";

  vm.password = '';
  vm.user_name = '';

  vm.obtainUser = function(){
    console.log('LoginController', vm.user_name);
    console.log('LoginController', vm.password);
    LoginService.loginUser(vm.user_name, vm.password);
    vm.password = '';
    vm.user_name = '';
  };

});
