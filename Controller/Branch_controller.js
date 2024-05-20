var branch = require("../Model/Branch_detail");
var rev = require("../Model/Branch_revenew");
var admin = require("../Model/Branch_detail");
const bcrypt = require("bcrypt");


exports.s = async (req, res) => {
  var data = await rev.create(req.body);
  res.status(200).json({
    status: "show branch",
    data,
  });
};

exports.addbranch = async (req, res) => {
  var  password = await bcrypt.hash(req.body.password, 10);
  req.body.password = password;
  var data = await branch.create(req.body);
  var id = data._id;
  req.body.branch_id = id;
  var data = await rev.create(req.body);

  var data2 = await rev.findOneAndUpdate(
    { branch_id: id },
    {
      $set: {
        revenew: [
          { month: "January" },
          { month: "February" },
          { month: "March" },
          { month: "April" },
          { month: "May" },
          { month: "June" },
          { month: "July" },
          { month: "August" },
          { month: "September" },
          { month: "October" },
          { month: "November" },
          { month: "December" },
        ],
      },
    }
  );

  res.status(200).json({
    status: "add branch",
    data,
  });
};

exports.updatebranch = async (req, res) => {
  var id = req.params.id;
  var data = await branch.findByIdAndUpdate(id, req.body);
  
  res.status(200).json({
    status: "delete branch",
    data,
  });
};

exports.datelebranch = async (req, res) => {
  var id = req.params.id;
  var data = await branch.findByIdAndDelete(id);
  res.status(200).json({
    status: "update branch",
    data,
  });
};

exports.showallbranch = async (req, res) => {
  
  var data = await branch.find();
  res.status(200).json({
    status: "show branch",
    data,
  });
};

exports.showbranch = async (req, res) => {
  var id = req.params.id;
  var data = await branch.findById(id);
  res.status(200).json({
    status: "show branch",
    data,
  });
};

exports.login = async (req, res) => {
  var data = await admin.find({ email: req.body.email });
  if (data.length == 1) {
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      data[0].password
    );
    if (isPasswordMatch) {
      res.status(200).json({
        status: "user is logged in",
        data: data[0],
      });
    } else {
      res.status(200).json({
        status: "password does not match",
      });
    }
  } else {
    res.status(200).json({
      status: "please register",
    });
  }
};
