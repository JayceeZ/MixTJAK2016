function Sound(args) {
  this.buffer = null;
  this.filename = null;

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
  this.__onBufferProgress = function(progress) {
    // Update view for loading progress
    var percentComplete;

    if (e.lengthComputable) {
      percentComplete = e.loaded / e.total * 100;
      this.drawer.updateLoader(percentComplete);
    }
  };

  /**
   * When file stream have been fully (or partially ?) loaded
   */
  this.onTrackLoaded = function(trackBuffer) {
    // Buffer is fully loaded
  };

  this.getName = function() {
    return this.filename;
  }

  /**
   * Setup
   */
  this.init(args.filepath);
}