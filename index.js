var express = require('express'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    path = require("path"),
    mongoose = require('mongoose'),
    _ = require('lodash'),
    schemas = require('./schemas.js');

var databaseUrl = "mongodb://127.0.0.1:27017/";
var database = "mixtjak2016_development";
mongoose.connect(databaseUrl+database);

/* Express server */
var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(logger('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public/')));

/**
 * Authentication
 */
passport.use('local-signin', new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        console.log("Login failure: " + username);
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        console.log("Login failure: " + password);
        return done(null, false, { message: 'Incorrect password.' });
      }
      console.log("Login success: " + user.username);
      return done(null, user);
    });
  }
));

passport.use('local-signup', new LocalStrategy(
  {passReqToCallback : true}, //allows us to pass back the request to the callback
  function(req, username, password, done) {
    funct.localReg(username, password)
      .then(function (user) {
        if (user) {
          console.log("REGISTERED: " + user.username);
          req.session.success = 'You are successfully registered and logged in ' + user.username + '!';
          done(null, user);
        }
        if (!user) {
          console.log("COULD NOT REGISTER");
          req.session.error = 'That username is already in use, please try a different one.'; //inform user could not log them in
          done(null, user);
        }
      })
      .fail(function (err){
        console.log(err.body);
      });
  }
));

app.post('/login',
  function() {
    console.log('Login post');
    passport.authenticate('local-signin',
      {
        successRedirect: '/',
        failureRedirect: '/'
      });
  }
);

app.post('/signup',
  function() {
    console.log('Sign up post');
    passport.authenticate('local-signup',
      {
        successRedirect: '/',
        failureRedirect: '/'
      });
  }
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

/**
 * REST API
 */
app.post('/project', function(req, res) {
  if(!req.accepts('application/json'))
    return;
  var askedName = req.body.name;

  schemas.Project.findOne({ name: askedName }, function(err, result) {
    if(result)
      res.status(200).json(result);
    else
      res.status(404);
  });
});

app.post('/project/sound', function(req, res) {
  if(!req.accepts('application/json'))
    return;
  var askedName = req.body.name;
  var newSound = req.body.sound;

  schemas.Project.findOne({ name: askedName }, function(err, result) {
    if(result) {
      var nouveauSon = new schemas.Sound({name: newSound});
      result.sounds.push(nouveauSon);
      result.save();
      nouveauSon.save();
      res.status(200).json(result);
    } else
      res.status(404);
  });
});

app.post('/project/new', function (req, res) {
  if(!req.accepts('application/json'))
    return;
  var reqJson = req.body;

  var name = reqJson.name;

  var project = new schemas.Project({name: name});
  project.save(function (err) {
    if (err)
      res.status(500).json({ message: 'Request is malformed' });
    else
      res.status(200).json({ message: 'Project have been created', project: project });
  }, this);
});

// LAUNCH SERVER
app.listen(8000);