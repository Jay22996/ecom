var coupne = require("../Model/Coupne_details");


exports.addcoupne = async (req,res)=>{

    var find = await coupne.find({ coupne_code: req.body.coupne_code });
    if(find.length == 1){
        res.status(409).json({
            status: "Coupen code is Already exist",
          });
    }else{
        var id = req.params.id
    req.body.user_id = id
    var data = await coupne.create(req.body)
    res.status(200).json({
        status:"add",
        data
    })
    }
    
}

exports.showc = async (req,res)=>{

    var data = await coupne.find()
    res.status(200).json({
        status:"find",
        data
    })
}

exports.showcid = async (req,res)=>{

    let user_id = req.params.id
    var data = await coupne.find({"user_id":user_id})
    res.status(200).json({
        status:"findone",
        data
    })
}

exports.findyou = async (req,res)=>{

    let coupne_cod = req.body.coupne_code
    var data = await coupne.findOne({"coupne_code":coupne_cod})
    res.status(200).json({
        status:"use",
        data
    })
}
 


exports.coupneuse = async (req,res)=>{

    var use = "Used"
    req.body.userOrnot = use
    var coupne_code = req.body.coupne_code
    var data1 = await coupne.findOneAndUpdate({"coupne_code":coupne_code},req.body)
    res.status(200).json({
        status:"use",
        data1
    })
}
