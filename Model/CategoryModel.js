var mongoose = require("mongoose");

var category_schema = new mongoose.Schema({
  category_name: { type: String },
  category_img: { type: String },
  products: { type: Number },
  show: { type: String ,default:"yes"},

});

module.exports = mongoose.model("category_details", category_schema);
