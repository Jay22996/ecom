var mongoose = require('mongoose');

var product_schema = new mongoose.Schema({
    product_name : {type:String},
    category_id: {type: mongoose.Schema.Types.ObjectId,ref:'category_details'},
    description:{type:String},
    photos:[{
        type:String
    }],
    price:{type:Number,default:0.0},
    cust_price:{type:Number,default:0.0},
    reseller_price:{type:Number,default:0.0},
    stock_Id:{type: mongoose.Schema.Types.ObjectId,ref:'Product_Stock'}
})

module.exports = mongoose. model('Product_detail',product_schema);