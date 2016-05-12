'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var daySchema = new Schema({
	present : [{type : Schema.ObjectId,
                ref : 'enfant'}],
	absentY : [{type : Schema.ObjectId,
                ref : 'enfant'}],
	absentN : [{type : Schema.ObjectId,
                ref : 'enfant'}]
});

exports.day = mongoose.model('day', daySchema);
