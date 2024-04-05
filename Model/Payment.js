var mongoose = require('mongoose');

var payment_schema = new mongoose.Schema({
    transaction_id : {type:String},
    payment_date: {type: Date},
    amount:{type: Number,default:0.0},
    payment_Status:{type:String},
    payment_method:{type:String},
    order_id:{type: mongoose.Schema.Types.ObjectId,ref:'Order_details'}

})

module.exports = mongoose. model('payment_detail',payment_schema);