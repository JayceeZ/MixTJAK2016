'use strict';

// Declare app level module which depends on views, and components
var appMixTJAKApp = angular.module('mixTJAK2016App', ['ngRoute']);

appMixTJAKApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/home', {
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl'
    }).
    otherwise({
      redirectTo: '/home'
    });
  }]);