var address = require("../Model/Shipping_address_model");

exports.add_address = async (req,res)=>{
    var id = req.params.id
    req.body.user_id = id
    var data = await address.create(req.body)
    res.status(200).json({
        status:"add address",
        data
    })
 

exports.find_address = async (req,res)=>{

    id = req.params.id
    var data = await address.find({"user_id":id}).populate("user_id")
    res.status(200).json({
        status:"find address",
        data
    })
}

exports.delete_address = async (req,res)=>{

    id = req.params.id
    var data = await address.findByIdAndDelete(id)
    res.status(200).json({
        status:"delete address",
        data
    })
}

exports.update_address = async (req,res)=>{

    id = req.params.id
    var data = await address.findByIdAndUpdate(id,req.body)
    res.status(200).json({
        status:"update address",
        data
    })
}