var coupne = require("../Model/Coupne_details");
var user = require("../Model/User_data");
const otpGenerator = require("otp-generator");

exports.addcoupne = async (req, res) => {

  
  var find = await coupne.find({ coupne_code: req.body.coupne_code });

  if (find.length == 1) {
    res.status(200).json({
      status: "Coupen code is Already exist",
    });
  } else {
    var data = await coupne.create(req.body);
    var data1 = await coupne.find();
    res.status(200).json({
      status: "add",
      data,
      data1,
    });
  }
};

exports.showc = async (req, res) => {
  var data1 = await coupne.find();
  res.status(200).json({
    status: "find",
    data1,
  });
};

exports.cdelete = async (req, res) => {
  var code = req.params.id

  var data1 = await coupne.findOneAndDelete({coupne_code:code});
  console.log(data1);
  res.status(200).json({
    status: "delete",
    data1,
  });
};

exports.cupdate = async (req, res) => {
  var code = req.params.id
  console.log(req.body.coupne_code);
  console.log(req.body.discountPer);
  console.log(req.body.ex_date);
  console.log(req.body.max_discountPer);
  console.log(req.body.usenumber);


  var data1 = await coupne.findOneAndUpdate({coupne_code:code});
  res.status(200).json({
    status: "update",
    data1,
  });
};

exports.showcid = async (req, res) => {
  let user_id = req.params.id;
  var data = await coupne.find({ user_id: user_id });
  res.status(200).json({
    status: "findone",
    data,
  });
};

exports.findyou = async (req, res) => {
  let coupne_cod = req.body.coupne_code;
  var data = await coupne.findOne({ coupne_code: coupne_cod });
  res.status(200).json({
    status: "use",
    data,
  });
};
exports.coupne_status = async (req, res) => {
  
  var coupne_code = req.body.coupne_code;
  var userid = req.body.user_id

  var data1 = await coupne.findOneAndUpdate(
    { coupne_code: coupne_code },
      { $push: { 'useby.user_id': userid } },
  );

  res.status(200).json({
    status: "use",
    data1,
  });
};

exports.coupneuse = async (req, res) => {
  var coupne_code = req.body.coupne_code;

  var data1 = await coupne.findOne({ coupne_code: coupne_code });

  if (data1 !== null) {
    var useby = data1.useby.length;
    var usenumber = data1.usenumber;

    if (usenumber > useby) {
      for (var i = 0; i < data1.useby.length; i++) {
        if (req.body.user_id === data1.useby[i].user_id) {
          res.status(200).json({
            status: "already use by number",
          });
          return; // Exit the function once a response is sent
        }
      }
      res.status(200).json({
        status: "not use",
      });
    } else {
      res.status(200).json({
        status: "already use",
      });
    }
  } else {
    res.status(200).json({
      status: "coupne not found",
    });
  }
};


exports.ref = async (req, res) => {
  var user_mobile = req.body.refmobile;

  var user_id = user.findOne({ mobile_number: user_mobile });

  if (user_id !== null) {
    let today = new Date();

    // Create a new date object for one month from today
    let nextMonth = new Date();
    nextMonth.setMonth(today.getMonth() + 1);

    var code = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    req.body.user_id = user_id._id;
    req.body.ex_date = nextMonth;
    req.body.coupne_code = code;
    req.body.generateby = "ref";
    var data = await coupne.create(req.body);

    res.status(200).json({
      status: "coupne create",
      data,
    });
  } else {
    res.status(200).json({
      status: "ref not availble",
      data,
    });
  }
};
