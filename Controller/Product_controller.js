var product = require("../Model/ProductModel");
var p_stock = require("../Model/Product_stock");
var rating = require("../Model/Review_detail");


exports.addproduct = async (req,res)=>{

    var stock = await p_stock.create(req.body)
    var stock_Id = stock._id

    var id = req.params.id
    req.body.category_id = id
    req.body.stock_Id = stock_Id
    var data = await product.create(req.body)
    var name = data._id
    req.body.product_id = name
    // req.body.rating_id = name
    var ratingg = await rating.create(req.body)
    var rid = ratingg._id
    var data = await product.findByIdAndUpdate({_id:name},{rating_id:rid})

    var stock1 = await p_stock.findByIdAndUpdate(stock_Id,req.body)
    res.status(200).json({
        status:"add",
        data,
        stock,
        stock1
    })
}

exports.showallproduct = async (req,res)=>{

    var data = await product.find().populate("category_id").populate("stock_Id")

    res.status(200).json({
        status:"find",
        data
    })

}

exports.showproduct = async (req,res)=>{
    var id = req.params.id
    var data = await product.findById(id).populate("category_id").populate("stock_Id")

    res.status(200).json({
        status:"find",
        data
    })

}

exports.deleteproduct = async (req,res)=>{
    var id = req.params.id
    var data = await product.findByIdAndDelete(id)
    var id1 = data.stock_Id
    var data1 = await p_stock.findByIdAndDelete(id1)
    res.status(200).json({
        status:"delete",
        data,
        data1
    })

}

exports.updateproduct = async (req,res)=>{
    var id = req.params.id
    var data = await product.findByIdAndUpdate(id,req.body)

    res.status(200).json({
        status:"update",
        data
    })

}