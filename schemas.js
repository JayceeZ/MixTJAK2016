var mongoose = require('mongoose'),
    relationship = require('mongoose-relationship');

var projectSchema = new mongoose.Schema({
  name: String,
  sounds: [{ type: mongoose.Schema.ObjectId, ref: 'Sound' }]
});
var Project = mongoose.model('Project', projectSchema);

var soundSchema = new mongoose.Schema({
  name: String,
  buffer: Array,
  projects: [{ type: mongoose.Schema.ObjectId, ref: 'Project', childPath: 'sounds' }]
});
soundSchema.plugin(relationship, { relationshipPathName: 'projects' });
var Sound = mongoose.model('Sound', soundSchema);

module.exports = {
  Project: Project,
  Sound: Sound
};
