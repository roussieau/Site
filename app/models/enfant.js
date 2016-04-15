'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var enfantSchema = new Schema({
	nom : {type :String, required: true},
    prenom : {type : String, required: true},
    totem : String,
    sexe : {type : String, required: true},
    date : {type : Date, required: true},
    section : {type : Schema.ObjectId, required: true},
    statut : {type : Number, default : 1},
    commentaire : String
});

exports.enfant = mongoose.model('enfant', enfantSchema);
