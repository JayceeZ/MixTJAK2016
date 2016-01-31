
appMixTJAKApp.controller('HomeCtrl', ['$scope', function($scope) {
  $scope.progress = 0;

  var canvasSounds = angular.element('#sounds')[0];
  var canvasPlaying = angular.element('#playing')[0];
  var playlist = new Playlist(canvasPlaying, canvasSounds);

  playlist.loadAllSoundSamples(finished, progress, this);

  function finished() {
    $scope.progress = "All songs have been loaded";
  }

  function progress(p) {
    $scope.$apply(function() {
      $scope.progress = p;
    });
  }

  $scope.onClickPlay = function() {
    playlist.playFrom(0);
  };

  $scope.onClickStop = function() {
    playlist.stopAllTracks();
  };
}]);

appMixTJAKApp.directive("resize", function(){
  return {
    restrict: "A",
    link: function(scope, element) {
      element[0].width = parseInt(element[0].clientWidth);
      element[0].height = parseInt(element[0].clientHeight);
    }
  };
});