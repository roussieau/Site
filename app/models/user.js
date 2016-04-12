'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

var userSchema = new Schema({
    nom : String,
    prenom : String,
    email : String,
    password : String,
    adresse : {
        rue : String,
        numero : Number,
        ville : String
    },
    gsm : String,
    enfants : [Schema.ObjectId],
    grade : {type : Number, default : 1},
	section : Schema.ObjectId
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

exports.user = mongoose.model('user', userSchema);
