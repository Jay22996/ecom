var mongoose = require("mongoose");

var address_schema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User_data" },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  pincode: { type: Number },
  type: { type: String },
});

module.exports = mongoose.model("user_address", address_schema);
