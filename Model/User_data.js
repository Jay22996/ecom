var mongoose = require('mongoose');

var User_schema = new mongoose.Schema({
    name : {type : String},
    email : {type : String},
    password : {type : String},
    profile_photo :{type : String},
    mobile_number:{type : String},
    role : {type : String},
})

module.exports = mongoose. model('User_data',User_schema);