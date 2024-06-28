var mongoose = require("mongoose");

var coupne_schema = new mongoose.Schema({
  coupne_code: { type: String },
  discountPer: { type: Number, default: 0.0 },
  max_discountPer: { type: Number },
  ex_date: { type: Date },
  issue_date: { type: Date },
  // userOrnot: { type: String, default: "not_use" },
  usenumber: {type :Number},
  useby:[{
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User_data" },
  }],
  generateby:{type:String,default:"system"},
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User_data" },
});

module.exports = mongoose.model("Coupne_details", coupne_schema);
