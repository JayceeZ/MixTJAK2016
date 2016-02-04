var mongoose = require('mongoose'),
    relationship = require('mongoose-relationship');

var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  info: {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  playlist : [{ type:Schema.ObjectId, ref:"Playlist" }]
});

var playListSchema = new Schema({
    name: { type: String, required: true, unique: true },
    parent: { type:Schema.ObjectId, ref:"User", childPath:"playlist" },
    sounds: [{ type:Schema.ObjectId, ref:"Sound" }]
});

var Playlist = mongoose.model('Playlist', playListSchema);

var soundSchema = new Schema({
  url: {type: String},
  duration: { type: String, required: true},
  parents: [{ type:Schema.ObjectId, ref:"Playlist", childPath:"sounds" }]
});

var Sound = mongoose.model("Sound", soundSchema);

// on every save, add the date
userSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});



// make this available to our users in our Node applications
module.exports = { Playlist:Playlist, Sound:Sound};