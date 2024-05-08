var mongoose = require("mongoose");

var reseller_schema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User_data" },
  gst_no: { type: String },
  address: { type: String },
  city: { type: String },
  pin_code: { type: String },
});

module.exports = mongoose.model("reseller_req", reseller_schema);
