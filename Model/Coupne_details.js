var mongoose = require("mongoose");

var coupne_schema = new mongoose.Schema({
  coupne_code: { type: String },
  discountPer: { type: Number, default: 10 },
  max_discountPer: { type: Number,default:100 },
  ex_date: { type: Date },
  issue_date: { type: Date ,default:new Date()},
  // userOrnot: { type: String, default: "not_use" },
  usenumber: {type :Number,default: 1},
  useby:[{
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User_data" },
  }],
  generateby:{type:String,default:"system"},
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User_data" },
});

module.exports = mongoose.model("Coupne_details", coupne_schema);
