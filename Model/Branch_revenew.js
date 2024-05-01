var mongoose = require('mongoose');

var branch_schema = new mongoose.Schema({
    branch_id :{type: mongoose.Schema.Types.ObjectId,ref:'branch_detail'},
    revenew : [
    {
        month:{type:String},
        m_rev:{type:Number,default:0.0}
    }
]
})

module.exports = mongoose. model('branch_revenew',branch_schema);