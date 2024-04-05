var stock = require("../Model/Product_stock");


exports.stock = async (req,res)=>{

    var data = await stock.find().populate("product_id")
    res.status(200).json({
        status:"show stock",
        data
    })
}

exports.stockall = async (req,res)=>{
    var id = req.params.id
    var data = await stock.findById(id).populate("product_id")
    res.status(200).json({
        status:"show stock",
        data
    })
}

exports.stockadd = async (req,res)=>{
    var id = req.params.id
    var branchId = req.body.branch_id
    var quantitys = req.body.quantitys

    var data = await stock.findOneAndUpdate({"product_id":id},{
        $push: {
            quanitity: {
                branch_id: branchId,
                quanititys: quantitys
            }
        }
    })
    res.status(200).json({
        status:"add",
        data
    })
}

exports.stockupdate = async (req,res)=>{
    var quantitys = req.body.quantitys
    var id = req.params.id
    var branchId=req.params.bid

    var data = await stock.updateOne({product_id:id,"quanitity.branch_id":branchId},
    { $set: { 'quanitity.$.quanititys': quantitys } })
    res.status(200).json({
        status:"updated",
        data
    })
}