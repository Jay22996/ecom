var mongoose = require('mongoose');

var product_stock_schema = new mongoose.Schema({
    product_name : {type:String},
    product_id: {type: mongoose.Schema.Types.ObjectId,ref:'Product_detail'},
    quanitity:{type: Number},
    is_available:{type:String}
})

module.exports = mongoose. model('Product_Stock',product_stock_schema);