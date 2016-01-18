var logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    path = require("path"),
    mongoose = require('mongoose'),
    _ = require('lodash'),
    schemas = require('./schemas.js');
//https://www.npmjs.com/package/mongoose-relationship

var databaseUrl = "mongodb://127.0.0.1:27017/";
var database = "mixtjak2016_development";
mongoose.connect(databaseUrl+database);

/* Express server */
var express = require('express');
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
app.use(express.static(path.join(__dirname, '../public')));

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