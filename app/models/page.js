'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pageSchema = new Schema({
    nom : String,
    titre : String,
    body : String
});

exports.page = mongoose.model('page', pageSchema);
