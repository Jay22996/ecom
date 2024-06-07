var product = require("../Model/ProductModel");
var p_stock = require("../Model/Product_stock");
var stock = require("../Model/Product_stock");

var rating = require("../Model/Review_detail");
var cat = require("../Model/CategoryModel");
var brand = require("../Model/Brand");

exports.addproduct = async (req, res) => {
  var stock = await p_stock.create(req.body);
  var stock_Id = stock._id;

  var id = req.params.id;
  req.body.category_id = id;
  req.body.stock_Id = stock_Id;
  var data = await product.create(req.body);
  var name = data._id;
  req.body.product_id = name;

  var ratingg = await rating.create(req.body);
  var rid = ratingg._id;
  var data2 = await product.findByIdAndUpdate(
    { _id: name },
    { rating_id: rid }
  );

  var data3 = await cat.findByIdAndUpdate(req.body.category_id, {
    $inc: { products: 1 },
  });

  var data4 = await brand.findByIdAndUpdate(req.body.brand_id, {
    $inc: { products: 1 },
  });

  var stock1 = await p_stock.findByIdAndUpdate(stock_Id, req.body);
  var b_id = "664aca474de093734eb7e209";
  var stock2 = await p_stock.findOneAndUpdate(
    { product_id: name },
    {
      $push: {
        quanitity: {
          quanititys: req.body.quanititys,
          branch_id: b_id,
        },
      },
    }
  );
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

exports.product_quantity = async (req, res) => {
  var id = req.params.id;
  var data1 = await p_stock.findOne({
    product_id: id,
    quanitity: {
      $elemMatch: {
        branch_id: req.body.branch_id
      },
    },
  });
  if (data1 === null) {
      if(req.body.branch_id !== "664aca474de093734eb7e209"){
        var data2 = await p_stock.findOneAndUpdate({product_id: id}, {
          $push: {
            quanitity: {
              quanititys: req.body.quanitity,
              branch_id: req.body.branch_id,
            },
          },
        });
        var data5 = await p_stock.findOneAndUpdate(
          { product_id: id, "quanitity.branch_id": "664aca474de093734eb7e209" },
          {
            $inc: {
              "quanitity.$.quanititys": -req.body.quanitity 
            }
          },
          { new: true }
        );

      }else{
        var data6 = await p_stock.findOneAndUpdate({product_id: id}, {
          $push: {
            quanitity: {
              quanititys: req.body.quanitity,
              branch_id: req.body.branch_id,
            },
          },
        });
      }
  } else{
    if(req.body.action === "add"){
      if(req.body.branch_id === "664aca474de093734eb7e209"){
        var data3 = await p_stock.findOneAndUpdate(
          { product_id: id, "quanitity.branch_id": "664aca474de093734eb7e209" },
          {
            $inc: {
              "quanitity.$.quanititys": req.body.quanitity,
            },
          },
          { new: true }
        );
      }else{
        var data12 = await p_stock.findOneAndUpdate(
          { product_id: id, "quanitity.branch_id": req.body.branch_id },
          {
            $inc: {
              "quanitity.$.quanititys": req.body.quanitity,
            },
          },
          { new: true }
        );
        var data7 = await p_stock.findOneAndUpdate(
          { product_id: id, "quanitity.branch_id": "664aca474de093734eb7e209" },
          {
            $inc: {
              "quanitity.$.quanititys": -req.body.quanitity,
            },
          },
          { new: true }
        );
      }
    }else if(req.body.action === "remove"){
        var data10 = await p_stock.findOneAndUpdate(
          { product_id: id, "quanitity.branch_id": req.body.branch_id },
          {
            $inc: {
              "quanitity.$.quanititys": -req.body.quanitity,
            },
          },
          { new: true }
        );
    }
  }
  var data = await stock.find().populate("product_id")

  res.status(200).json({
    status: "update",
    data,
  });
};

exports.product_stock = async (req, res) => {
  var id = req.params.id
  var data = await p_stock.findOneAndUpdate(
    { product_id: id, "quanitity.branch_id": req.body.branch_id },
    {
      $set: {
        "quanitity.$.quanititys": req.body.quanitity,
      },
    },
    { new: true }
  );

  res.status(200).json({
    status: "update",
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
  var data2 = await product.findById(id);
  var b_id = data2.brand_id;
  var c_id = data2.category_id;
  console.log(b_id);
  console.log(c_id);
  console.log(req.body.brand_id);
  console.log(req.body.category_id);

  if (req.body.brand_id !== undefined) {
    var data3 = await brand.findByIdAndUpdate(b_id, {
      $inc: { products: -1 }, // Decrement products count by 1
    });

    var data5 = await brand.findByIdAndUpdate(req.body.brand_id, {
      $inc: { products: 1 }, // Increment products count by 1
    });
  }
  if (req.body.category_id !== undefined) {
    var data4 = await cat.findByIdAndUpdate(c_id, {
      $inc: { products: -1 }, // Decrement products count by 1
    });

    var data6 = await cat.findByIdAndUpdate(req.body.category_id, {
      $inc: { products: 1 }, // Increment products count by 1
    });
  }

  var data1 = await product.findByIdAndUpdate(id, req.body);
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
  if (data1 === "show") {
    var status = "hide";
  } else if (data1 === "hide") {
    status = "show";
  }
  var show = await product.findByIdAndUpdate(id, { show: status });
  var data = await product.find().populate("category_id").populate("brand_id");

  res.status(200).json({
    status: "update",
    data,
  });
};

exports.show_yes = async (req, res) => {
  var data = await product
    .find({ show: "show" })
    .populate("category_id")
    .populate("brand_id");
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
