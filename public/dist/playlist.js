
var Playlist = function(canvas) {
  this.sounds = [];

  // Audio context
  var audioContext = window.AudioContext || window.webkitAudioContext;
  this.context = new audioContext();

  // Global playing params and elements
  this.masterVolumeNode = null;
  this.totalTime = 0;
  this.elapsedTimeSinceStart = 0;
  this.lastTime = 0;

  this.waveformDrawer = new WaveformDrawer(this.context);
  this.canvas = canvas;

  this.__drawTrack = function drawTrack(decodedBuffer) {
    this.waveformDrawer.init(decodedBuffer, canvas, 'green');
    // First parameter = Y position (top left corner)
    // second = height of the sample drawing
    this.waveformDrawer.drawWave(0, canvas.height);
  };

  this.loadAllSoundSamples = function(callback) {
    // Instantiates sounds for loading the buffers
    var testSound = new Sound({ filepath: '/sounds/test.mp3', onload: {fn: soundLoaded, scope: this}, context: this.context});

    this.sounds.push(testSound);

    var _this = this, loadProgress = 0;
    function soundLoaded() {
      loadProgress++;
      if(_this.sounds.length == loadProgress) {
        _this.finishedLoading(callback);
      }
    }
  };

  this.finishedLoading = function() {
    console.log("Finished loading");

    this.__drawTrack(this.sounds[0].buffer);

    this.__buildGraph();
    callback.call();
  };

  this.playFrom = function(startTime) {
    this.sounds.forEach(function(s) {
      // First parameter is the delay before playing the sample
      // second one is the offset in the song, in seconds, can be 2.3456
      // very high precision !
      s.start(0, startTime);
    });

    // Note : we memorise the current time, context.currentTime always
    // goes forward, it's a high precision timer
    console.log("start all tracks startTime =" + startTime);
    this.lastTime = context.currentTime;
    this.paused = false;
  };

  this.__buildGraph = function() {
    // Create a single gain node for master volume
    this.masterVolumeNode = this.context.createGain();

    console.log("Number of songs = " + this.sounds.length);

    var _this = this;
    this.sounds.forEach(function(sound) {
      // each sound sample is the  source of a graph
      sound.generateBufferSource(_this.masterVolumeNode);
    });
    // Connect the master volume to the speakers
    this.masterVolumeNode.connect(this.context.destination);
  };

  this.animateTime = function() {
    if (!this.paused) {
      // Draw the time on the front canvas
      this.currentTime = this.context.currentTime;
      var delta = this.currentTime - this.lastTime;

      var canvas = this.canvas, ctx = canvas.getContext('2d');

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';
      ctx.font = '14pt Arial';
      ctx.fillText(elapsedTimeSinceStart.toPrecision(4), 100, 20);

      // at least one track has been loaded
      if (this.decodedAudioBuffer != undefined) {

        this.totalTime = this.decodedAudioBuffer.duration;
        var x = elapsedTimeSinceStart * canvas.width / this.totalTime;

        ctx.strokeStyle = "white";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();

        this.elapsedTimeSinceStart += delta;
        this.lastTime = currentTime;
      }
    }
    requestAnimationFrame(this.animateTime);
  };

  requestAnimationFrame(this.animateTime);
};