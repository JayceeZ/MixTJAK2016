var mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');

var User = new mongoose.Schema({
  uploads: []
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);