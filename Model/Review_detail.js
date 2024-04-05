var mongoose = require('mongoose');

var Review_schema = new mongoose.Schema({
    product_id  : {type: mongoose.Schema.Types.ObjectId,ref:'Product_detail'},
    user_id  : {type: mongoose.Schema.Types.ObjectId,ref:'User_data'},
    rating : {type : Number,default:0.0},
    comment : {type : String},
    review_date :{type : Date},
})

module.exports = mongoose. model('Review',Review_schema);