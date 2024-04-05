var Review = require("../Model/Review_detail");

exports.Reviewall = async (req,res)=>{

    var id = req.params.id
    req.body.product_id = id
    var data = await Review.create(req.body)

    res.status(200).json({
        status:"add Review",
        data
    })

}

exports.Reviewupdate = async (req,res)=>{

    var id = req.params.id
    var data = await Review.findByIdAndUpdate(id,req.body)

    res.status(200).json({
        status:"update Review",
        data
    })

}

exports.Reviewdelete = async (req,res)=>{

    var id = req.params.id
    var data = await Review.findByIdAndDelete(id)

    res.status(200).json({
        status:"datete Review",
        data
    })

}

exports.Reviewfine = async (req,res)=>{

    // var id = req.params.id
    var id = req.params.id

    console.log(id)
    var data = await Review.find({"product_id":id})

    res.status(200).json({
        status:"find Review",
        data
    })

}