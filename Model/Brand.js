var mongoose = require('mongoose');

var cart_schema = new mongoose.Schema({
    brand_name : {type:String},
    photo : {type:String},
    // products :{type:Number}
})

module.exports = mongoose. model('brand_name',cart_schema);