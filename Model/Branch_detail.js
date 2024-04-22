var mongoose = require('mongoose');

var branch_schema = new mongoose.Schema({
    branch_name : {type:String},
    branch_manager : {type:String},
    mobile_num:{type:String},
    lat: {type:String},
    log: {type:String},
    email:{type:String},
    password:{type:String},
    address:{type:String},
    pincode:{type:Number},
    city:{type:String},
    state:{type:String},
    country:{type:String},
})

module.exports = mongoose. model('branch_detail',branch_schema);