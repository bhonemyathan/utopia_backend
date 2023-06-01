const User = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  let user = new User();
  user.name = name;
  user.email = email;
  user.password = password;
  user.emailToken = crypto.randomBytes(64).toString("hex");
  user.isVerified = false;
  const userSave = await user.save();
  try {
    const link = `http://localhost:5000/api/user-panel/verify-email?token=${user.emailToken}`;
    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "utopiateammanagement@gmail.com",
        pass: "dykdykgllouepvmf",
      },
    });
    let mailDetail = {
      from: "Verify Account <UtopiaAdminTeam>",
      to: user.email,
      subject: "Verify Account",
      html: `<div style="display: flex;justify-content: center;align-items: center;"><div style="width: 400px;height: 500px;background: ;"><center><img src="https://icon-library.com/images/verified-icon-png/verified-icon-png-11.jpg" width="60px" height="60px" style="margin-top: 20px;"><h1 style="text-align: center;">Verification Email!</h1></center><h3>Dear,${user.name}</h3><p>Nice to see you here! Please click on the following link to verify your email address.</p><a href="${link}" target="_blank">Verify Account</a><p>Thank you for your support. We always appreciate that.</p><p>-UTOPIA Admin Team</p></div></div>`,
    };
    mailTransporter.sendMail(mailDetail, (err, data) => {
      if (err) {
        return res.status(500).json({
          message: "Email error Occurs",
        });
      } else {
        return res.status(201).json({
          message: "Account Created",
          email: "verify email sent",
          acc: userSave,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const userCheck = await User.findOne({ email: email });
  try {
    if (userCheck != null && User.compare(password, userCheck.password)) {
      const token = jwt.sign(
        { name: userCheck.name, id: userCheck._id },
        "UtopiaApiUser@",
        { expiresIn: "30d" }
      );
      res.status(200).json({
        message: "Login Successfull",
        token: token,
        info: userCheck,
      });
    } else {
      res.status(400).json({
        message: "Password is wrong",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};

exports.duplicateEmailCheck = async (req, res) => {
  const emailCheck = await User.findOne({ email: req.body.email });
  try {
    res.status(200).json({ status: emailCheck != null ? true : false });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
