var Category = require("../Model/CategoryModel");
var brand = require("../Model/Brand");

exports.addCategory = async (req, res) => {
  var data1 = await Category.create(req.body);
  var data = await Category.find();
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
  var data1 = await Category.findByIdAndUpdate(id, req.body);
  var data = await Category.find();
  res.status(200).json({
    status: "update",
    data,
  });
};

exports.addbrand = async (req, res) => {
  var data1 = await brand.create(req.body);
  var data = await brand.find();

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
  var data1 = await brand.findByIdAndUpdate(id, req.body);
  var data = await brand.find();

  res.status(200).json({
    status: "update",
    data,
  });
};

exports.catstatus = async (req, res) => {
  var id = req.params.id;
  var data2 = await Category.findById(id);
  var data1 = data2.show;
  if (data1 === "yes") {
    var status = "no";
  } else if (data1 === "no") {
    status = "yes";
  }
  var show = await Category.findByIdAndUpdate(id, { show: status });
  var data = await Category.find()

  res.status(200).json({
    status: "find",
    data,
  });
};

exports.brandstatus = async (req, res) => {
  var id = req.params.id;
  var data2 = await brand.findById(id);
  var data1 = data2.show;
  if (data1 === "show") {
    var status = "hide";
  } else if (data1 === "hide") {
    status = "show";
  }
  var show = await brand.findByIdAndUpdate(id, { show: status });
  var data = await brand.find()

  res.status(200).json({
    status: "find",
    data,
  });
};
