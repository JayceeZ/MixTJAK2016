
appMixTJAKApp.controller('HomeCtrl', ['$scope', function($scope) {
  $scope.progress = 0;

  // Audio context
  var audioContext = window.AudioContext || window.webkitAudioContext;
  var context = new audioContext();

  $scope.sound = new Sound({ filepath: '/sounds/test.mp3', onload: {fn: drawTrack, scope: this}, onprogress: {fn: progress, scope: this}, context: context});

  var canvas = angular.element('#sounds')[0];

  var waveformDrawer = new WaveformDrawer();

  function drawTrack(decodedBuffer) {
    waveformDrawer.init(decodedBuffer, canvas, 'green');
    // First parameter = Y position (top left corner)
    // second = height of the sample drawing
    waveformDrawer.drawWave(0, canvas.height);
  }

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