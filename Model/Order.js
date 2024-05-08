var mongoose = require("mongoose");

var Order_schema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User_data" },
  order_date: { type: Date },
  total_amount: { type: Number, default: 0.0 },
  coupon_id: { type: String },
  coupon_per: { type: String },
  status: { type: String, default: "pending" },
  branch_id: { type: mongoose.Schema.Types.ObjectId, ref: "branch_detail" },
  ordermode: { type: String },
  orderitems: [
    {
      orderitem_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "orderitem_detail",
      },
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product_detail",
      },
    },
  ],
  lat: { type: String },
  log: { type: String },
  order_merchand: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  pincode: { type: String },
  comment: { type: String },
  address_type: { type: String },
  payment_id: {
    type: [mongoose.Schema.Types.ObjectId, String],
    ref: "payment_detail",
    default: null,
  },
  shipment_id: { type: String },
});

module.exports = mongoose.model("Order_details", Order_schema);
