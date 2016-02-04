// if our user.js file is at app/models/user.js
var imported = require('./modelObject');
  
var sound = new imported.Sound({url:"webmail.polytech.unice.fr",duration:"tout"});

var playlist = new imported.Playlist({sounds: [sound]});

// create a new user called chris
var chris = new imported.User({
  info : { username : "testsrete", password : "nimportequoi"},
  playlist:[playlist]
});

sound.save(function(err) {
  if (err) throw err;

  console.log('User saved successfully!');
});



playlist.save(function(err){
  if (err) throw err;

  console.log('Playlist saved successfully!');
});

// call the built-in save method to save to the database
chris.save(function(err) {
  if (err) throw err;

  console.log('User saved successfully!');
});




/*
// create a new user
var newUser = User({
  name: 'Peter Quill',
  username: 'starlord55',
  password: 'password',
  admin: true
});

// save the user
newUser.save(function(err) {
  if (err) throw err;

  console.log('User created!');
});

// get all the users
User.find({}, function(err, users) {
  if (err) throw err;

  // object of all the users
  console.log(users);
});
*/