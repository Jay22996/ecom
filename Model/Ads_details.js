var mongoose = require('mongoose');

var Abs_schema = new mongoose.Schema({
    title : {type:String},
    active_status : {type:String,default:"active"},
    imd_url:{type:String},
    date: {type:String,default:Date.now()}
})

module.exports = mongoose. model('Abs_detail',Abs_schema);