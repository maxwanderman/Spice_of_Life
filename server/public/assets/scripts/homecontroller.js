app.controller('HomeController', function(LoginService, ListManagerService, randomRestService){
  var vm = this;


  vm.userData = LoginService.userData;
  vm.restList = ListManagerService.restList;
  vm.finaleChoice = randomRestService.finalChoice;
  // vm.finalChoice = {};
  vm.restArray = [];
  vm.listChoice = '';
  vm.zip = '';
  vm.showRest = false;
  vm.superSelect = true;


  LoginService.getUser();
  ListManagerService.getRestList();


  vm.getListRandom = function(){
    ListManagerService.getRestList();
    vm.restList = ListManagerService.restList.info;
    console.log(vm.restList);
    console.log(vm.restList[0].restaurant_name);
    vm.getArray(vm.restList, vm.restArray);
    if (vm.restArray.length === 0){
      alert('Favorites List Empty!');
    } else if (vm.restArray.length === 1) {
      vm.listChoice = vm.restArray[0];
      vm.showRest = true;
      vm.superSelect = false;
    } else {
      vm.shuffle(vm.restArray);
      vm.listChoice = vm.restArray[0];
      vm.showRest = true;
      vm.superSelect = false;
    }
  };

  vm.getArray = function(array, secondArray){
    for(var it = 0; it < array.length; it++){
      secondArray.push(array[it].restaurant_name);
    }
    return secondArray;
  };

  vm.obtainSurprise = function(){
    randomRestService.surpriseME(vm.zip);
    vm.zip = '';
    vm.finaleChoice = randomRestService.finalChoice;
  };


  vm.shuffle = function(array) {
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


});
