var mongoose = require("mongoose");

var cart_schema = new mongoose.Schema({
  brand_name: { type: String },
  photo: { type: String },
  products: { type: Number, default: 0 },
  show: { type: String ,default:"yes"},

});

module.exports = mongoose.model("brand_name", cart_schema);
