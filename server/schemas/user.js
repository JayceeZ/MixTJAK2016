var mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');

var User = new mongoose.Schema({
  uploads: [],
  rights: { type: Number, default: 1 }, // Default normal
  projects : [{ type: mongoose.Schema.ObjectId, ref:"Project", childPath:"user" }],
  updated_at: { type: Date },
  created_at: { type: Date }
});

User.plugin(passportLocalMongoose);

// on every save, add the date
User.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  this.updated_at = currentDate;
  this.created_at = currentDate;

  next();
});

module.exports = mongoose.model('User', User);