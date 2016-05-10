app.controller('ListController', function(ListManagerService){
  var vm = this;

  vm.listData = ListManagerService.listData;

  vm.message = "Edit your favorites";

  vm.restaurant_name = '';

  vm.addRest = function (){
    ListManagerService.postRestaurant(vm.restaurant_name);
    vm.restaurant_name = '';
    ListManagerService.getRestaurant();
  };

  ListManagerService.getRestaurant();


});
