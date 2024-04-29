var mongoose = require('mongoose');

var Order_schema = new mongoose.Schema({
    user_id : {type: mongoose.Schema.Types.ObjectId,ref:'User_data'},
    order_date : {type:Date},
    total_amount:{type:Number,default:0.0},
    coupon_id:{type:String},
    coupon_per:{type:String},
    status: {type:String,default:"pending"},
    branch_id: {type: mongoose.Schema.Types.ObjectId,ref:'branch_detail'},
    ordermode:{type:String},
    orderitems:[{
        orderitem_id:{type: mongoose.Schema.Types.ObjectId,ref:'orderitem_detail'}
    }],
    lat:{type:String},
    log:{type:String},
    order_merchand:{type:String},
    address:{type:String},
    payment_id:{type: mongoose.Schema.Types.ObjectId,ref:'payment_detail'}
})

module.exports = mongoose. model('Order_details',Order_schema);