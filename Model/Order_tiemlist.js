var mongoose = require('mongoose');

var orderitel_schema = new mongoose.Schema({
    order_id : {type: mongoose.Schema.Types.ObjectId,ref:'Order_details'},
    product_id : {type: mongoose.Schema.Types.ObjectId,ref:'Product_detail'},
    quantity:{type:Number},
    price:{type:Number,default:0.0},
    sub_total: {type:Number,default:0.0},
    barnch_id:{type: mongoose.Schema.Types.ObjectId,ref:'branch_detail'},
    status:{type:String,default:"pending"},
    shipment_id:{type: mongoose.Schema.Types.ObjectId,ref:'Shipment_detail'},
    SKU:{type:String},

})

module.exports = mongoose. model('orderitem_detail',orderitel_schema);