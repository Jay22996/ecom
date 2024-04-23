var mongoose = require('mongoose');

var reseller_schema = new mongoose.Schema({
    user_id : {type: mongoose.Schema.Types.ObjectId,ref:'User_data'},
})

module.exports = mongoose. model('reseller_req',reseller_schema);