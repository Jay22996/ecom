var mongoose = require('mongoose');

var Like_schema = new mongoose.Schema({
    user_id : {type: mongoose.Schema.Types.ObjectId,ref:'User_data'},
    product_list : [{
        product_id:{type: mongoose.Schema.Types.ObjectId,ref:'Product_detail'},
    }]
})

module.exports = mongoose. model('Like_List',Like_schema);