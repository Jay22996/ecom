var mongoose = require('mongoose');

var Abs_schema = new mongoose.Schema({
    title : {type:String},
    active_status : {type:String},
    imd_url:{type:String},
    date: {type:String}
})

module.exports = mongoose. model('Abs_detail',Abs_schema);