var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
  name: String,
  sounds: Array
});

var musicSchema = new mongoose.Schema({
  name: String,
  buffer: Array
});

module.exports = {
  project: projectSchema,
  music: musicSchema
};
