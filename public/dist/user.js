
var User = function() {
  this.id = 0;
  this.songs = [];
  this.sounds = [];

  /**
   * Fetch all user songs from server
   */
  this.loadSounds = function() {
    var sounds = [];

    sounds.push(new Sound({ filepath: '/sounds/test.mp3', onload: {fn: soundLoaded, scope: this}, context: this.context}));

    this.sounds = sounds;
    return sounds;
  };
};