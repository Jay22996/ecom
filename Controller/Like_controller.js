var like = require("../Model/LikeList");


exports.addlikelist = async (req,res)=>{
    var id = req.params.id
    product_id = req.body.product_id
    var data = await like.findOneAndUpdate({"user_id":id},{$push:{"product_list":{"product_id":product_id}}})

    res.status(200).json({
        status:"add to likelist",
        data
    })
}

exports.unlikelist = async (req,res)=>{
    var id = req.params.id
    product_id = req.body.product_id
    var data = await like.findOneAndUpdate({"user_id":id},{$pull:{"product_list":{"product_id":product_id}}})

    res.status(200).json({
        status:"remove to likelist",
        data
    })
}

exports.showlikelist = async (req,res)=>{
    var id = req.params.id
    var data = await like.find({"user_id":id}).populate("product_list.product_id")

    res.status(200).json({
        status:"show likelist",
        data
    })
}
