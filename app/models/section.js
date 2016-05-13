'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sectionSchema = new Schema({
    nom : String,
    abr : String,
    description : {type : String,
    				default : "Description"} 
});

exports.section = mongoose.model('section', sectionSchema);
