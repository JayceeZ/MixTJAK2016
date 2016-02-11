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

/**
 * REST API
 */
// Generate doc with
// apidoc -i ./ -o ../public/apidocs/ -e node_modules/
// in server folder

/**
 * @api {post} /login Login User
 * @apiName PostUserLogin
 * @apiGroup User
 *
 * @apiParam {String} username User name
 * @apiParam {String} password User password
 *
 * @apiSuccess {String} id User unique ID.
 */
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
          res.status(401).send();
        } else {
          console.log('User ' + req.body.username + ' authenticated');

          //code audric
          user.ztestvar="testvarcontent";

          var caches = [];
          var autest = JSON.stringify(user, function(key, value) {
            if (typeof value === 'object' && value !== null) {
              if (caches.indexOf(value) !== -1) {
                // Circular reference found, discard key
                return;
              }
              // Store value in our collection
              caches.push(value);
            }
            return value;
          });
          caches = null; // En

          res.status(200).send(autest);// { id: result._id, projects: result.projects, rights: result.rights });
        }
      });
    } else {
      console.log('Error on user authentication : username incorrect');
      res.status(404).json('Username not found');
    }
  });
});

app.get('/user/:id', function(req, res) {
  User.findOne({ id: req.id }, function(error, result) {
    if(error)
      res.status(500).send();
    else if(result) {
      res.status(200).json({ name: result.username, projects: result.projects, rights: result.rights });
    } else {
      res.status(404).json("User don't exist");
    }
  });
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

/**
 * @api {post} /register Register a User
 * @apiName PostUser
 * @apiGroup User
 *
 * @apiSuccess {String} id Unique user ID
 * @apiSuccess {Number} rights User rights.
 */
app.post('/register', function(req, res, next) {
  console.log('Registering user');
  User.register(new User({username: req.body.username}), req.body.password, function(err, result) {
    if (err) {
      console.log('Error on user registration', err);
      res.status(401).json('Error on registration');
    }
    else {
      console.log('User ' + req.body.username + ' successfully registered');
      res.status(200).json({id: result._id, rights: result.rights});
    }
  });
});

var schemas = require('./schemas/project');

/**
 * @api {get} /projects Request All Projects
 * @apiName GetProjects
 * @apiGroup Project
 *
 * @apiSuccess {Array} Array of all Projects.
 */
app.get('/projects', function(req, res) {
  schemas.Project.find({}, function(err, result) {
    res.status(200).json(result);
  });
});

/**
 * @api {get} /project/:id Request Project Content
 * @apiName GetProjectContent
 * @apiGroup Project
 *
 * @apiParam {Number} id Project unique ID.
 *
 * @apiSuccess {String} name Name of the Project.
 * @apiSuccess {Array} tracks Tracks of the Project.
 * @apiSuccess {Array} filters Filters of the Project.
 * @apiSuccess {Array} regions Regions of the Project.
 * @apiSuccess {Integer} nbrTracks Number of tracks of the Project.
 */
app.get('/project/:id', function(req, res) {
  schemas.Project.findOne({ id: req.id }, function(err, result) {
    if(result)
      res.status(200).json({name: result.name, tracks: result.tracks, filters: result.filters, regions: result.regions, nbrTracks: result.tracks.length});
    else
      res.status(404);
  });
});

/**
 * @api {get} /project/:id/tracks Request Project Tracks
 * @apiName GetProjectTracks
 * @apiGroup Project
 *
 * @apiParam {Number} id Project unique ID.
 * @apiSuccess {Array} tracks Tracks of the Project.
 */
app.get('/project/:id/tracks', function(req, res) {
  schemas.Project.findOne({ id: req.id }, function(err, result) {
    if(result) {
      res.status(200).json({tracks: result.tracks});
    } else
      res.status(404);
  });
});

/**
 * @api {post} /project/save Save new Project
 * @apiName PostNewProject
 * @apiGroup Project
 *
 * @apiParam {String} name Project name.
 * @apiParam {String} userId User id.
 *
 * @apiParam {Array} tracks Project tracks.
 * @apiParam {Array} filters Project filters.
 * @apiParam {Array} regions Project regions.
 *
 * @apiSuccess {String} response Unique Project Id
 */
app.post('/project/save', function (req, res) {
  if(!req.accepts('application/json'))
    return;
  var reqJson = req.body;

  var userId = reqJson.userId;
  var tracks = reqJson.tracks;
  var filters = reqJson.filters;
  var regions = reqJson.regions;

  User.findOne({ _id: userId }, function(error, result) {
    if(error) {
      res.status(401).json('Error '+error);
      return;
    }

    if(result) {
      console.log("User found creating project");
      var project = new schemas.Project(
        {
          user: result._id,
          tracks: tracks,
          filters: filters,
          regions: regions
        }
      );
      project.save(function(err) {
        if (err) {
          res.status(400).json('Something went wrong: ' + err);
        } else {
          res.status(200).json(project._id);
          result.projects.push(project._id);
          result.save();
        }
      });
    } else {
      res.status(404).json('User not found');
    }
  });
});

/**
 * @api {post} /project/:id Update a Project
 * @apiName UpdateProject
 * @apiGroup Project
 *
 * @apiParam {Number} :id Project id.
 *
 * @apiParam {Array} tracks Project tracks.
 * @apiParam {Array} filters Project filters.
 * @apiParam {Array} regions Project regions.
 *
 * @apiSuccess {String} response Unique Project Id
 */
app.post('/project/:id', function (req, res) {
  if(!req.accepts('application/json'))
    return;
  var reqJson = req.body;

  schemas.Project.findOne({ id: req.id }, function(error, result) {
    if(error) {
      res.status(401).json('Project could not be updated: '+error);
    }
    if(result) {
      result.tracks = reqJson.tracks;
      result.filters = reqJson.filters;
      result.regions = reqJson.regions;
      result.save();
      res.status(200).json(result._id);
    } else {
      res.status(404).json('Project with id '+req.id+' does not exist');
    }
  });
});

/**
 * @api {delete} /project/:id Delete a Project
 * @apiName DeleteProject
 * @apiGroup Project
 */
app.delete('/project/:id', function (req, res) {
  schemas.Project.findOne({ id: req.id }, function(err, result) {
    if(!err) {
      if(result)
        result.remove({_id: req.id}, function (err) {
          if (err)
            res.status(500).json('Project could not be deleted: ' + err);
          else {
            res.status(200).json('Project successfully deleted');
          }
        });
      else
        res.status(404).json('Project not found');
    } else {
      res.status(500).json('Error: '+err);
    }
  });
});

/**
 * @api {post} /upload/sound Upload Sound
 * @apiName PostSound
 * @apiGroup Sound
 *
 * @apiParam {File} sound Sound file
 * @apiSuccess {String} response Url of the uploaded file
 */
app.post('/upload/sound', upload.single('sound'), function(req, res, next) {
  if(req.file) {
    console.log("Sound uploaded to " + req.file.path);
    res.status(200).json("uploads/" + req.file.filename);
  } else {
    res.status(401).json("No file were given (attr: sound)");
  }
});

// LAUNCH SERVER
app.listen(8000);