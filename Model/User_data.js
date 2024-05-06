var mongoose = require('mongoose');

var User_schema = new mongoose.Schema({
    name : {type : String,default:""},
    email : {type : String},
    password : {type : String},
    profile_photo :{type : String,default:""},
    mobile_number:{type : String,default:""},
    role : {type : String,default:"customer"},
    gst_no : {type : String,default:""},
    p_address : {type: mongoose.Schema.Types.ObjectId,ref:'user_address'},
    // address : {type: String},
    // city : {type: String},
    // pin_code : {type: String},
    lat:{type: String},
    lon:{type: String},
    token:{type: String,default:""}

})

module.exports = mongoose. model('User_data',User_schema);