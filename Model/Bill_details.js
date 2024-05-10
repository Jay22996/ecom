var mongoose = require("mongoose");

var bill_schema = new mongoose.Schema({
  address: { type: String },
  pincode: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  gst: {type: String},
  email:{type: String},
  mobile:{type: String},
  note:{type: String},
  dcharge:{type: String},
  name:{type: String}
});

module.exports = mongoose.model("bill_detail", bill_schema);
