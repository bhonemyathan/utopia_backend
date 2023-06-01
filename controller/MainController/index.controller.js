const Jobs = require("../../models/job.model");
const User = require("../../models/user.model");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcryptjs = require("bcryptjs");

const JWT_TOKEN = "UtopiaApi";

exports.index = async (req, res) => {
  try {
    const jobsFind = await Jobs.find({ status: "approve" })
      .sort({ create: -1 })
      .limit(6);
    res.status(200).json({
      message: "Index Jobs",
      jobs: jobsFind,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      err: error,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  const userCheck = await User.findOne({ email: req.body.email });
  try {
    if (userCheck != null) {
      const secretCode = JWT_TOKEN + userCheck.password;
      const token = jwt.sign(
        { email: userCheck.email, id: userCheck._id },
        secretCode,
        { expiresIn: "15m" }
      );
      const resetLink = `http://localhost:5000/reset-password/${userCheck._id}/${token}`;
      let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "utopiateammanagement@gmail.com",
          pass: "dykdykgllouepvmf",
        },
      });

      let mailDetail = {
        from: "Reset Password <Utopia Admin Team>",
        to: userCheck.email,
        subject: "Reset Passsword",
        html: `<div style="display: flex;justify-content: center;align-items: center;"><div style="width: 400px;height: 500px;background: ;"><center><img src="https://icon-library.com/images/verified-icon-png/verified-icon-png-11.jpg" width="60px" height="60px" style="margin-top: 20px;"><h1 style="text-align: center;">Reset Password</h1></center><h3>Dear,${userCheck.name}</h3><p>Did you forget your password? We got a request to the reset the password for your account. Click on the link down below to continue this action.</p><p>Thank you for supporting UTOPIA</p><a href="${resetLink}" target="_blank">${resetLink}</a>`,
      };
      mailTransporter.sendMail(mailDetail, (error, data) => {
        if (error) {
          res.status(502).json({
            message: "Error Occurs",
            error: error,
          });
        } else {
          res.status(200).json({
            message: "Email sent successfully",
          });
        }
      });
    } else {
      res.status(400).json({
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};

exports.resetPasswordPage = async (req, res) => {
  const { id, token } = req.params;
  const userCheck = await User.findOne({ _id: id });
  if (userCheck === null) {
    res.status(422).json({
      message: "User not found",
    });
  } else {
    const secretCode = JWT_TOKEN + userCheck.password;
    try {
      const verifyToken = jwt.verify(token, secretCode);
      res.status(200).json({
        message: "Vertification success",
        verify: verifyToken,
      });
    } catch (error) {
      res.status(203).json({
        message: "Vertification failed",
      });
    }
  }
};

exports.resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const userCheck = await User.findOne({ _id: id });
  if (userCheck === null) {
    res.status(422).json({
      message: "User not found",
    });
  } else {
    const secretCode = JWT_TOKEN + userCheck.password;
    try {
      const verifyToken = jwt.verify(token, secretCode);
      const passwordDecrypt = bcryptjs.hashSync(
        req.body.password,
        bcryptjs.genSaltSync(8),
        null
      );
      const passwordUpdate = await User.findOneAndUpdate(
        { _id: userCheck._id },
        { $set: { password: passwordDecrypt } }
      );
      try {
        res.status(200).json({
          message: "Your password is updated",
        });
      } catch (error) {
        res.status(417).json({
          message: "You can't update your password<Error>",
          error: error,
        });
      }
    } catch (error) {
      res.status(203).json({
        message: "Vertification Failed",
      });
    }
  }
};
