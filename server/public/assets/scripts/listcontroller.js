app.controller('ListController', function(ListManagerService){
  var vm = this;

  vm.listData = ListManagerService.listData;

  vm.message = "Edit your favorites";

  vm.addValue = false;
  vm.editValue = false;

  vm.restaurant_name = '';

  vm.edit = function (){
    vm.editValue = true;
  };

  vm.add = function (){
    vm.addValue = true;
  };
  vm.delete = function(){

  };

  vm.addRest = function (){
    ListManagerService.postRestaurant(vm.restaurant_name);
    vm.restaurant_name = '';
    ListManagerService.getRestaurant();
  };

  ListManagerService.getRestaurant();


});
