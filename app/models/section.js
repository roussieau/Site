var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sectionSchema = new Schema({
    nom : String
});

exports.section = mongoose.model('section', sectionSchema);
