app.controller('HomepageController', ['$scope', function($scope) {
  $scope.sound = new Sound({ filepath: '/sounds/test.mp3' }).getName();
}]);