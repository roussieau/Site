'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
	titre : String,
	body : String,
	section : Schema.ObjectId,
	date : {type : Date, default : Date.now}
});

exports.blog = mongoose.model('blog', blogSchema);
