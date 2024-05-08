var abs = require("../Model/Ads_details");


exports.addabs = async (req,res)=>{

    var data = await abs.create(req.body)
    res.status(200).json({
        status:"done",
        data
    })
}

exports.showallabs = async (req,res)=>{

    var data = await abs.find()
    res.status(200).json({
        status:"show abs",
        data
    })
}

exports.showabs = async (req,res)=>{
    var id = req.params.id
    var data = await abs.findById(id)
    res.status(200).json({
        status:"show abs",
        data
    })
}

exports.updateabs = async (req,res)=>{
    var id = req.params.id
    var data = await abs.findByIdAndUpdate(id,req.body)
    var data1 = await abs.find()

    res.status(200).json({
        status:"show abs",
        data1
    })
}

exports.deleteabs = async (req,res)=>{
    var id = req.params.id
    var data = await abs.findByIdAndDelete(id)
    var data1 = await abs.find()
    res.status(200).json({
        status:"show abs",
        data1
    })
}