var pay = require("../Model/Payment");

exports.payment = async (req,res)=>{

    var data = await pay.create(req.body)
    res.status(200).json({
        status:"pament",
        data
    })
}

exports.payment_update = async (req,res)=>{

    var id = req.params.id
    var data = await pay.findByIdAndUpdate(id,req.body)
    res.status(200).json({
        status:"payment_update",
        data
    })
}

exports.payment_delete = async (req,res)=>{

    var id = req.params.id
    var data = await pay.findByIdAndDelete(id)
    res.status(200).json({
        status:"payment_update",
        data
    })
}

exports.payment_find = async (req,res)=>{

    var id = req.params.id
    var data = await pay.findOne({"order_id":id})
    res.status(200).json({
        status:"find",
        data
    })
}