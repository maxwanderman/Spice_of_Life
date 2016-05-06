var app = angular.module('spiceApp', ['ngRoute']);


app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider
      .when('/', {
        templateUrl: '/views/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      })
      .when('/home', {
        templateUrl: '/views/homepage.html',
        controller: 'HomeController',
        controllerAs: 'home'
      })
      .when('/listFavorites', {
        templateUrl: '/views/listFavorites.html',
        controller: 'ListController',
        controllerAs: 'list'
      })
      .when('/logout', {
        templateUrl: '/views/logout.html',
        controller: 'LogoutController',
        controllerAs: 'logout'
      })
      .when('/register', {
        templateUrl: '/views/register.html',
        controller: 'RegController',
        controllerAs: 'reg'
      });

  $locationProvider.html5Mode(true);

  }]);
