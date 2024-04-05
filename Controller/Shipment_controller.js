var ship = require("../Model/Shipment");
var item = require("../Model/Order_tiemlist");


exports.add_shipment = async (req,res)=>{
    var id = req.params.id
    req.body.orderitem_id = id
    var data = await ship.create(req.body)
    var shipment_id = data._id
    req.body.shipment_id = shipment_id
    var data1 = await item.findByIdAndUpdate(id,req.body)
    
    res.status(200).json({
        status:"add shipment",
        data
    })
}

exports.update_shipment = async (req,res)=>{

    var id = req.params.id
    var data = await ship.findByIdAndUpdate(id,req.body)

    res.status(200).json({
        status:"update shipment",
        data
    })
}

exports.Delete_shipment = async (req,res)=>{

    var id = req.params.id
    var data = await ship.findByIdAndDelete(id)

    res.status(200).json({
        status:"Delete shipment",
        data
    })
}

exports.find_shipment = async (req,res)=>{

    var id = req.params.id
    var data = await ship.findOne({"orderitem_id":id})

    res.status(200).json({
        status:"find shipment",
        data
    })
}