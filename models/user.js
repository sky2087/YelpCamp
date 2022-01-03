//npm i passport passport-local passport-local-mongoose

const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    }
});

//this will automatically add username and password
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema)