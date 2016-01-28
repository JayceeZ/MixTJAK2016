
appMixTJAKApp.controller('HomeCtrl', ['$scope', function($scope) {
  $scope.progress = 0;

  var canvas = angular.element('#sounds')[0];
  var playlist = new Playlist(canvas);

  playlist.loadAllSoundSamples(progress(100));

  function progress(p) {
    $scope.progress = p;
  }
}]);

appMixTJAKApp.directive("progress", function() {
  return {
    restrict: "A",
    link: function(scope, element) {
      scope.$watch("progress", function(newValue, oldValue) {
        element[0].content = newValue;
      });
    }
  };
});