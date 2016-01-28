
appMixTJAKApp.controller('HomeCtrl', ['$scope', function($scope) {
  $scope.progress = 0;

  var canvasSounds = angular.element('#sounds')[0];
  var canvasPlaying = angular.element('#playing')[0];
  var playlist = new Playlist(canvasPlaying, canvasSounds);

  playlist.loadAllSoundSamples(finished, progress, this);

  function finished() {
    $scope.progress = "All loaded";

  }
  function progress(p) {
    $scope.progress = p;
  }

  $scope.onClickPlay = function() {
    playlist.playFrom(0);
  };

  $scope.onClickStop = function() {
    playlist.stopAllTracks();
  };

  $scope.$watch( 'progress',
    function(newValue, oldValue){
      console.log('progress Changed');
      console.log(newValue);
      console.log(oldValue);
    }
  );
}]);