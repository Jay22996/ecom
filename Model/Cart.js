var mongoose = require("mongoose");

var cart_schema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User_data" },
  product_list: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product_detail",
      },
      quantity: { type: Number, default: 1 },
    },
  ],
});

module.exports = mongoose.model("User_cart", cart_schema);
