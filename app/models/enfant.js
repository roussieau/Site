var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var enfantSchema = new Schema({
    nom : String,
    prenom : String,
    totem : String,
    sexe : String,
    date : Date,
    section : Schema.ObjectId,
    statut : {type : Number, default : 1},
    commentaire : String
});

exports.enfant = mongoose.model('enfant', enfantSchema);