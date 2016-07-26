app.controller('ListController', function(ListManagerService){
  var vm = this;

  vm.listData = ListManagerService.listData;

  vm.message = "Edit your favorites";

  vm.addValue = false;
  vm.editValue = false;

  vm.restaurant_name = '';
  vm.thingToDelete = '';

  vm.edit = function (){
    vm.editValue = true;
  };

  vm.add = function (){
    vm.addValue = true;
  };

  vm.deleteThing = function(id){
    vm.thingToDelete = id;
    console.log(vm.thingToDelete);
    ListManagerService.deleteListItem(id);
    ListManagerService.getRestaurant();
  };

  vm.addRest = function (){
    ListManagerService.postRestaurant(vm.restaurant_name);
    vm.restaurant_name = '';
    ListManagerService.getRestaurant();
  };

  ListManagerService.getRestaurant();


});
