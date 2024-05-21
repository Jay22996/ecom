var mongoose = require("mongoose");

var product_stock_schema = new mongoose.Schema({
  product_name: { type: String },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product_detail" },
  quanitity: [{
    branch_id:{type: mongoose.Schema.Types.ObjectId, ref: "branch_detail" },
    quanititys:{type: Number}
  }],
});

module.exports = mongoose.model("Product_Stock", product_stock_schema);
