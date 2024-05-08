var Category = require("../Model/CategoryModel");
var brand = require("../Model/Brand");

exports.addCategory = async (req, res) => {
  var data = await Category.create(req.body);
  res.status(200).json({
    status: "add",
    data,
  });
};

exports.showCategory = async (req, res) => {
  var data = await Category.find();
  res.status(200).json({
    status: "find all",
    data,
  });
};

exports.deleteCategory = async (req, res) => {
  var id = req.params.id;
  var data = await Category.findByIdAndDelete(id);
  res.status(200).json({
    status: "delete",
    data,
  });
};

exports.updateCategory = async (req, res) => {
  var id = req.params.id;
  var data = await Category.findByIdAndUpdate(id, req.body);
  res.status(200).json({
    status: "update",
    data,
  });
};

exports.addbrand = async (req, res) => {
  var data = await brand.create(req.body);
  res.status(200).json({
    status: "add",
    data,
  });
};

exports.showbrand = async (req, res) => {
  var data = await brand.find();
  res.status(200).json({
    status: "find all",
    data,
  });
};

exports.deletebrand = async (req, res) => {
  var id = req.params.id;
  var data = await brand.findByIdAndDelete(id);
  res.status(200).json({
    status: "delete",
    data,
  });
};

exports.updatebrand = async (req, res) => {
  var id = req.params.id;
  var data = await brand.findByIdAndUpdate(id, req.body);
  res.status(200).json({
    status: "update",
    data,
  });
};
