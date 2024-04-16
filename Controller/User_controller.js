var userModel = require("../Model/User_data");
var cart = require("../Model/Cart");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
var nodemailer = require("nodemailer");
var like = require("../Model/LikeList")

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
    var data2 = await cart.create(req.body);
    req.body.user_id = userid;
    var data3 = await like.create(req.body);
    res.status(200).json({
      status: "user register",
      data,
      data2,
      data3
    });
};

exports.login = async (req, res) => {
  var data = await userModel.find({ email: req.body.email });
  console.log(data)
  if (data.length == 1) {
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      data[0].password
    );
    if (isPasswordMatch) {
      res.status(200).json({
        status: "user is logged in",
        data:data[0]
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

exports.finduser = async (req,res)=>{
    var data = await userModel.find()
    res.status(200).json({
        status:"find",
        data
    })
}

exports.finduserid = async (req,res)=>{
    var id = req.params.id
    var data = await userModel.findById(id)
    res.status(200).json({
        status:"find",
        data
    })
}

exports.updateuser = async (req,res)=>{

    
    var id = req.params.id
    var data = await userModel.findByIdAndUpdate(id,req.body)
    res.status(200).json({
        status:"done",
        data
    })
}