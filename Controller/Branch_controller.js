var branch = require("../Model/Branch_detail");
var rev = require("../Model/Branch_revenew");

exports.s = async (req,res)=>{

    var data = await rev.create(req.body)
    res.status(200).json({
        status:"show branch",
        data
    })
}

exports.addbranch = async (req,res)=>{

    var data = await branch.create(req.body)
    var id = data._id
    req.body.branch_id = id
    var data = await rev.create(req.body)

    var data2 = await rev.findOneAndUpdate({branch_id:id},{
        $set: {
            revenew: [
                { month: "January"},
                { month: "February" },
                { month: "March" },
                { month: "April" },
                { month: "May" },
                { month: "June" },
                { month: "July" },
                { month: "August" },
                { month: "September" },
                { month: "October" },
                { month: "November" },
                { month: "December" },

            ]
        }
    })


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