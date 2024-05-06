var userModel = require("../Model/User_data");
var cart = require("../Model/Cart");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
var nodemailer = require("nodemailer");
var like = require("../Model/LikeList");
var ureq = require("../Model/Resellerrrrq");


var otp = "";
var email = "";
var password = "";
exports.verify = async (req, res) => {
  var find = await userModel.find({ email: req.body.email });
  if (find.length == 1) {
    res.status(409).json({
      status: "user already is registered",
    });
  } else {
    otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });
    email = req.body.email;
    password = await bcrypt.hash(req.body.password, 10);

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "studentcreative79@gmail.com",
          pass: "mgvywuvapoijukrb",
        },
      });

      const mailOptions = {
        from: "studentcreative79@gmail.com",
        to: `${email}`,
        subject: "One Time Otp",
        text: `${otp}`,
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({
        status: `Email sent successfully`,
        otp: otp,
      });
    } catch (error) {
      console.error("Error sending email:", error);

      res.status(500).json({
        status: "Error",
        message: "Failed to send email",
        error: error.message,
      });
    }
  }
};

exports.register = async (req, res) => {
  req.body.email = email;
  req.body.password = password;
  var data = await userModel.create(req.body);
  var userid = data._id;
  req.body.user_id = userid;
  var data2 = await cart.create(req.body);
  req.body.user_id = userid;
  var data3 = await like.create(req.body);
  res.status(200).json({
    status: "user register",
    data,
    data2,
    data3,
  });
};

exports.login = async (req, res) => {
  var data = await userModel.find({ email: req.body.email });
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

exports.finduser = async (req, res) => {
  var data = await userModel.find();
  res.status(200).json({
    status: "find",
    data,
  });
};

exports.find = async (req, res) => {
  var data = await userModel.find().populate("p_address");
  res.status(200).json({
    status: "find",
    data,
  });
};

exports.finduserid = async (req, res) => {
  var id = req.params.id;
  var data = await userModel.findById(id);
  res.status(200).json({
    status: "find",
    data,
  });
};

exports.updateuser = async (req, res) => {
  var id = req.params.id;
  var data = await userModel.findByIdAndUpdate(id, req.body);
  res.status(200).json({
    status: "done",
    data,
  });
};

exports.resallerreqsend = async (req, res) => {
  var data = await ureq.create(req.body);
  res.status(200).json({
    status: "done",
    data,
  });
};

exports.showree = async (req, res) => {
  var data = await ureq.find().populate("user_id");
  res.status(200).json({
    status: "done",
    data,
  });
};

exports.reqdelete = async (req, res) => {
  var id = req.params.id
  var data = await ureq.findByIdAndDelete(id)
  var data1 = await ureq.find().populate("user_id");
  res.status(200).json({
    status: "delete",
    data1,
  });
};

exports.updateuserresaller = async (req, res) => {
  var id = req.params.id;
  var data1 = await ureq.findById(id);
  var u_id = data1.user_id
  var gst_no = data1.gst_no
  var address = data1.address
  var pin_code = data1.pin_code
  var city = data1.city

  req.body.role = "reseller";
  req.body.gst_no = gst_no
  req.body.address = address
  req.body.pin_code = pin_code
  req.body.city = city

  var data = await userModel.findByIdAndUpdate(u_id, req.body);
  await ureq.findByIdAndDelete(id);

  res.status(200).json({
    status: "done",
    data,
  });
};

exports.showreseller = async (req, res) => {
  var data = await userModel.find({role:"reseller"});
  res.status(200).json({
    status: "done",
    data,
  });
};

exports.forget_pass = async (req, res) => {

  var password =await bcrypt.hash(req.body.password, 10);
  req.body.password = password
  var id = req.params.id
  var data = await userModel.findByIdAndUpdate(id,req.body);

 res.status(200).json({
      status: "done",
      data
    });

}

exports.find_data = async (req, res) => {

  var data = await userModel.find({email:req.body.email});

  if (data.length == 1) {
    otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false, specialChars: false ,lowerCaseAlphabets: false
    });
    email = req.body.email;
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "studentcreative79@gmail.com",
          pass: "mgvywuvapoijukrb",
        },
      });

      const mailOptions = {
        from: "studentcreative79@gmail.com",
        to: `${email}`,
        subject: "One Time Otp",
        text: `${otp}`,
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({
        status: `done`,
        otp: otp,
        id:data._id
      });
    } catch (error) {
      console.error("Error sending email:", error);

      res.status(500).json({
        status: "Error",
        message: "Failed to send email",
        error: error.message,
      });
    }
  } else {
    res.status(200).json({
      status: `user not found`,
    });
  }

}
