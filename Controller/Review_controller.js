var Review = require("../Model/Review_detail");

// exports.Reviewall = async (req,res)=>{

//     var id = req.params.id
//     req.body.product_id = id
//     var data = await Review.create(req.body)

//     res.status(200).json({
//         status:"add Review",
//         data
//     })

// }

exports.Reviewupdate = async (req,res)=>{

    var id = req.params.id
    var userid = req.body.userid
    var rating = req.body.rating
    var comment = req.body.comment
    var date = req.body.date
    var data = await Review.findOneAndUpdate(
        { product_id: id }, 
        { $push: { "rating": { "user_id": userid, "rating": rating, "comment": comment ,"review_date": date } } },
        { new: true } // This option returns the modified document rather than the original one
      );

    res.status(200).json({
        status:"update Review",
        data
    })

}

exports.Reviewdelete = async (req,res)=>{

    var id = req.params.id
    var rid = req.params.rid
    var data = await Review.findOneAndUpdate(
        { product_id: id },
        { $pull: { rating: { _id: rid } } },
        { new: true }
      );

    res.status(200).json({
        status:"datete Review",
        data
    })

}

exports.Reviewfine = async (req,res)=>{

    // var id = req.params.id
    var id = req.params.id

    console.log(id)
    var data = await Review.find({"product_id":id}).populate("rating.user_id").populate("product_id")

    res.status(200).json({
        status:"find Review",
        data
    })

}