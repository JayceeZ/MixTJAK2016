
appMixTJAKApp.controller('HomeCtrl', ['$scope', function($scope) {
  $scope.progress = 0;

  var canvas = angular.element('#sounds')[0];
  var playlist = new Playlist(canvas);

  playlist.loadAllSoundSamples(finished, progress, this);

  function finished() {
    $scope.progress = "All loaded";
  }
  function progress(p) {
    $scope.progress = p;
  }

  $scope.$watch( 'progress',
    function(newValue, oldValue){
      console.log('progress Changed');
      console.log(newValue);
      console.log(oldValue);
    }
  );
}]);