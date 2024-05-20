var stock = require("../Model/Product_stock");

exports.stock = async (req, res) => {
  var data = await stock.find().populate("product_id");
  res.status(200).json({
    status: "show stock",
    data,
  });
};

exports.stockall = async (req, res) => {
  // var id = req.params.id;
  var data = await stock.find().populate("product_id").populate("quantity.branch_id");
  res.status(200).json({
    status: "show stock",
    data,
  });
};

exports.stockadd = async (req, res) => {
  var id = req.params.id;
  // var branchId = req.body.branch_id
  // var quantitys = req.body.quantitys

  var data = await stock.findOneAndUpdate({ product_id: id }, req.body);
  res.status(200).json({
    status: "update",
    data,
  });
};

// exports.stockupdate = async (req,res)=>{
//     var quantitys = req.body.quantitys
//     var id = req.params.id
//     var branchId=req.params.bid

//     var data = await stock.findByIdAndUpdate({product_id:id},req.body)
//     res.status(200).json({
//         status:"updated",
//         data
//     })
// }
