function Sound(args) {
  // Two buffers (the decoded buffer and the playing buffer ("BufferSource")
  this.buffer = null;
  this.bufferSource = null;

  this.filename = null;
  this.progress = 0;
  this.context = args.context;

  /*************
   * PROTOTYPE *
   *************/
  this.init = function(filepath) {
    this.__createTrack(filepath);
  };

  /**
   * Instantiate a track with a filepath
   */
  this.__createTrack = function(filepath) {
    this.__loadBuffer(filepath);
  };

  /**
   * Loads an audio file via XHR.
   */
  this.__loadBuffer = function(filepath) {
    var xhr = new XMLHttpRequest();

    this.filename = filepath.replace(/^.*[\\\/]/, '');

    xhr.open('GET', filepath, true);
    xhr.responseType = 'arraybuffer';

    xhr.addEventListener('progress', this.__onBufferProgress.bind(this));
    xhr.addEventListener('load', this.onTrackLoaded.bind(this));
    xhr.send();
  };

  /**
   *
   */
  this.__onBufferProgress = function(evt) {
    // Update loading progress
    if (evt.lengthComputable) {
      this.progress = evt.loaded / evt.total * 100;
    }
    if(args.onprogress && !args.onprogress.fn)
      args.onprogress(this.progress);
    else if (args.onprogress.fn && args.onprogress.scope) {
      args.onprogress.fn.call(args.onprogress.scope, this.progress);
    }
  };

  /**
   * When file stream have been fully loaded
   */
  this.onTrackLoaded = function(request) {
    // Buffer is fully loaded

    var _this = this;
    this.context.decodeAudioData(
      request.target.response,
      function(buffer) {
        if (!buffer) {
          alert('error decoding file data: ' + url);
          return;
        }
        _this.buffer = buffer;

        // callback
        if(args.onload && !args.onload.fn)
          args.onload(_this.progress);
        else if (args.onload.fn && args.onload.scope) {
          args.onload.fn.call(args.onload.scope, _this.buffer);
        }
      },
      function(error) {
        console.error('decodeAudioData error', error);
      }
    );
  };

  this.generateBufferSource = function(masterVolumeNode) {
    this.bufferSource = this.context.createBufferSource();
    this.bufferSource.buffer = this.buffer;
    this.volumeNode = this.context.createGain();
    this.bufferSource.connect(this.volumeNode);

    this.bufferSource.connect(masterVolumeNode);
  };

  this.start = function(delay, startTime) {
    this.bufferSource.start(delay, startTime)
  };

  this.getName = function() {
    return this.filename;
  };

  this.getBuffer = function() {
    return this.buffer;
  };

  /**
   * Setup
   */
  this.init(args.filepath);
}