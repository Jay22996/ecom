var mongoose = require("mongoose");

var category_schema = new mongoose.Schema({
  category_name: { type: String },
  category_img: { type: String },
  products: { type: Number },
});

module.exports = mongoose.model("category_details", category_schema);
