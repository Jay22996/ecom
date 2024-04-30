var mongoose = require('mongoose');

var branch_schema = new mongoose.Schema({
    branch_id :{type: mongoose.Schema.Types.ObjectId,ref:'brand_name'},
    revenew : [
    {
        month:{type:String,default:"January"},
        m_rev:{type:Number,default:0.0}
    }
]
})

module.exports = mongoose. model('branch_revenew',branch_schema);