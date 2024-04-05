var branch = require("../Model/Branch_detail");


exports.addbranch = async (req,res)=>{

    var data = await branch.create(req.body)
    res.status(200).json({
        status:"add branch",
        data
    })
}

exports.updatebranch = async (req,res)=>{

    var id = req.params.id
    var data = await branch.findByIdAndUpdate(id,req.body)
    res.status(200).json({
        status:"delete branch",
        data
    })
}

exports.datelebranch = async (req,res)=>{

    var id = req.params.id
    var data = await branch.findByIdAndDelete(id)
    res.status(200).json({
        status:"update branch",
        data
    })
}

exports.showallbranch = async (req,res)=>{

    var data = await branch.find()
    res.status(200).json({
        status:"show branch",
        data
    })
}

exports.showbranch = async (req,res)=>{

    var id = req.params.id
    var data = await branch.findById(id)
    res.status(200).json({
        status:"show branch",
        data
    })
}