var product = require("../Model/ProductModel");
var p_stock = require("../Model/Product_stock");
var rating = require("../Model/Review_detail");
var cat = require("../Model/CategoryModel");
var brand = require("../Model/Brand");

exports.addproduct = async (req, res) => {
  // var stock = await p_stock.create(req.body)
  // var stock_Id = stock._id

  var id = req.params.id;
  req.body.category_id = id;
  // req.body.stock_Id = stock_Id
  var data = await product.create(req.body);
  // var name = data._id;
  // req.body.product_id = name;
  // req.body.rating_id = name
  // var ratingg = await rating.create(req.body);
  // var rid = ratingg._id;
  // var data2 = await product.findByIdAndUpdate(
  //   { _id: name },
  //   { rating_id: rid }
  // );

  var data3 = await cat.findByIdAndUpdate(req.body.category_id, {
    $inc: { products: 1 },
  });

  var data4 = await brand.findByIdAndUpdate(req.body.brand_id, {
    $inc: { products: 1 },
  });

  // var stock1 = await p_stock.findByIdAndUpdate(stock_Id,req.body)
  res.status(200).json({
    status: "add",
    data,
  });
};

exports.showallproduct = async (req, res) => {
  var data = await product.find().populate("category_id").populate("brand_id");

  res.status(200).json({
    status: "find",
    data,
  });
};

exports.showproduct = async (req, res) => {
  var id = req.params.id;
  var data = await product
    .findById(id)
    .populate("category_id")
    .populate("stock_Id");

  res.status(200).json({
    status: "find",
    data,
  });
};

exports.deleteproduct = async (req, res) => {
  var id = req.params.id;
  var data = await product.findByIdAndDelete(id);
  var id1 = data.stock_Id;
  var data1 = await p_stock.findByIdAndDelete(id1);
  res.status(200).json({
    status: "delete",
    data,
    data1,
  });
};

exports.updateproduct = async (req, res) => {
  var id = req.params.id;
  var data1 = await product.findByIdAndUpdate(id, req.body);
  var data2 = await product.findById(id);
  var b_id = data2.brand_id
  var c_id = data2.category_id
  console.log(req.body.brand_id);
  console.log(req.body.category_id);

  if(req.body.brand_id !== undefined){
    var data3 = await brand.findByIdAndUpdate(b_id, {
      $dec: { products: 1 },
    });
    
    var data5 = await brand.findByIdAndUpdate(req.body.brand_id, {
      $inc: { products: 1 },
    });
  }
if(req.body.category_id !== undefined){

  var data4 = await cat.findByIdAndUpdate(c_id, {
    $dec: { products: 1 },
  });

  var data6 = await cat.findByIdAndUpdate(req.body.category_id, {
    $inc: { products: 1 },
  });
}

  var data = await product.find().populate("category_id").populate("brand_id");
  
  res.status(200).json({
    status: "update",
    data,
  });
};

exports.productstatus = async (req, res) => {
  var id = req.params.id;
  var data2 = await product.findById(id);
  var data1 = data2.show;
  if (data1 === "yes") {
    var status = "no";
  } else if (data1 === "no") {
    status = "yes";
  }
  var show = await product.findByIdAndUpdate(id, { show: status });
  var data = await product.find().populate("category_id").populate("brand_id");

  res.status(200).json({
    status: "update",
    data,
  });
};

exports.show_yes = async (req, res) => {

  var data = await product.find({show:"yes"}).populate("category_id").populate("brand_id");
  res.status(200).json({
    status: "find",
    data,
  });
};

// exports.updateproduct = async (req,res)=>{
//     var id = req.params.id
//     var data = await product.findByIdAndUpdate({_id:id},{name:"jay"})

//     res.status(200).json({
//         status:"update",
//         data
//     })
// }
