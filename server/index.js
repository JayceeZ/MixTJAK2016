//============ Dependencies ===================
var express = require('express'),
    passport = require('passport'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    path = require("path"),
    mongoose = require('mongoose'),
    session = require('express-session'),
    multer = require('multer'),
    _ = require('lodash');

//================ Upload ======================

var storage = multer.diskStorage({
  destination: "./../public/uploads/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
var upload = multer({ storage: storage });

//============= MongoDB Setup ==================

var databaseUrl = "mongodb://127.0.0.1:27017/";
var database = "mixtjak2016_development";
mongoose.connect(databaseUrl+database);

//============== Express server =================
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
app.use(session({secret: 'mixtjak2016', saveUninitialized: true, resave: true}));
app.use(express.static(path.join(__dirname, '../public/')));

/**
 * Authentication with passport && sessions
 */
app.use(passport.initialize());
app.use(passport.session());

var User = require('./schemas/user');

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.post('/login', function(req, res) {
  console.log('Authenticating user ' + req.body.username);
  var user = User.findOne({username: req.body.username}, function(err, result) {
    if(err) {
      console.log('Error on user authentication :', err);
      return next(err);
    }
    if(result) {
      result.authenticate(req.body.password, function (err, user, passwordErr) {
        if (passwordErr) {
          console.log('Error on user authentication :', passwordErr.message);
          res.status(401);
        } else {
          console.log('User ' + req.body.username + ' authenticated');
          res.status(204);
        }
      });
    } else {
      console.log('Error on user authentication : username incorrect');
    }
  });
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.post('/user/register', function(req, res, next) {
  console.log('Registering user');
  User.register(new User({username: req.body.username}), req.body.password, function(err) {
    if (err) {
      console.log('Error on user registration', err);
      return next(err);
    }

    console.log('User '+ req.body.username +' successfully registered');

    res.redirect('/');
  });
});

/**
 * REST API
 */

var schemas = require('./schemas/modelObject');

/**
 * @api {get} /project/:id Request Project
 * @apiName GetProject
 * @apiGroup Project
 *
 * @apiParam {Number} id Project unique ID.
 *
 * @apiSuccess {String} name Name of the Project.
 * @apiSuccess {Array} sounds Sounds of the project.
 */
app.get('/playlist/:id', function(req, res) {
  schemas.Playlist.findOne({ id: req.id }, function(err, result) {
    if(result)
      res.status(200).json(result);
    else
      res.status(404);
  });
});

/**
 * @api {get} /project/:id/sounds Request Project Sounds
 * @apiName GetProjectSounds
 * @apiGroup Project
 *
 * @apiParam {Number} id Project unique ID.
 * @apiSuccess {Array} Sounds of the project.
 */
app.get('/playlist/:id/sounds', function(req, res) {
  schemas.Playlist.findOne({ id: req.id }, function(err, result) {
    if(result) {
      res.status(200).json(result.sounds);
    } else
      res.status(404);
  });
});

app.post('/playlist/new', function (req, res) {
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

app.post('/upload/sound', upload.single('sound'), function(req, res, next) {
  console.log("Sound uploaded to " + req.file.path);
  res.status(200).json("uploads/"+req.file.filename);
});

// LAUNCH SERVER
app.listen(8000);