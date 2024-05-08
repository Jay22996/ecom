var mongoose = require("mongoose");

var Shipment_schema = new mongoose.Schema({
  shipment_date: { type: Date },
  tracking_num: { type: String },
  order_status: { type: String, default: "pending" },
  orderitem_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "orderitem_detail",
  },
});

module.exports = mongoose.model("Shipment_detail", Shipment_schema);
