var mongoose = require('mongoose'),
    relationship = require('mongoose-relationship');

var Schema = mongoose.Schema;

var projectSchema = new Schema({
    name: { type: String, required: true },
    user: { type:Schema.ObjectId, ref: "User", childPath:"projects" },
    filters: { type: Array },
    regions: { type: Array },
    tracks: { type: Array }
});

var Project = mongoose.model('Project', projectSchema);
/*
var trackSchema = new Schema({
  url: {type: String},
  parents: [{ type:Schema.ObjectId, ref:"Project", childPath:"tracks" }]
});

var Track = mongoose.model("Track", trackSchema);
*/

// make this available to our Node applications
module.exports = { Project: Project }; //, Track: Track};