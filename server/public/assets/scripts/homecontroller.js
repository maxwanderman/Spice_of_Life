app.controller('HomeController', function(LoginService){
  var vm = this;


  vm.userData = LoginService.userData;

  LoginService.getUser();
  console.log(vm.userData);

  // vm.message = "Welcome " + vm.userData.info.user_name + "! Pick a resturaunt";


});
