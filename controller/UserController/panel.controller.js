const User = require("../../models/user.model");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const fs = require("fs");

exports.userPanel = async (req, res) => {
  const token = req.headers.token;
  const userId = jwt.verify(token, "UtopiaApiUser@");
  const profile = await User.findOne({ _id: userId.id });
  try {
    res.status(200).json({
      message: "User Profile",
      profile: profile,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.userPanelSetting = async (req, res) => {
  const token = req.headers.token;
  const userId = jwt.verify(token, "UtopiaApiUser@");
  const profile = await User.findOne({ _id: userId.id });
  try {
    res.status(200).json({
      message: "User Profile Setting",
      profile: profile,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.userPanelUpdateSetting = async (req, res) => {
  const token = req.headers.token;
  const userId = jwt.verify(token, "UtopiaApiUser@");
  let update = {
    name: req.body.uname,
    email: req.body.uemail,
    position: req.body.uposition,
    status: req.body.ustatus,
    bio: req.body.ubio,
    exp: req.body.uexperience,
    address: req.body.uaddress,
    city: req.body.ucity,
    country: req.body.ucountry,
    edulocation: req.body.uedulocation,
    eduuni: req.body.ueduuni,
    edudegree: req.body.uedudegree,
  };
  if (req.file) {
    update.image = "/images/profile/" + req.file.filename;
    const profileUpdate = await User.findOne({ _id: userId.id }).select(
      "image"
    );
    try {
      if (profileUpdate.image) {
        fs.unlink("public" + profileUpdate.image, (err) => {
          if (err) throw err;
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
  const userProfileUpdate = await User.findOneAndUpdate(
    { _id: userId.id },
    { $set: update }
  );
  try {
    res.status(200).json({
      message: "Updated Profile",
      profile: userProfileUpdate,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.changePassword = async (req, res) => {
  const token = req.headers.token;
  const userId = jwt.verify(token, "UtopiaApiUser@");
  const hashPassword = bcryptjs.hashSync(
    req.body.newpassword,
    bcryptjs.genSaltSync(8),
    null
  );
  const updatePassword = await User.findOneAndUpdate(
    { _id: userId.id },
    { $set: { password: hashPassword } }
  );
  try {
    res.status(200).json({
      message: "Password is updated!",
      hashpwd: hashPassword,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.verifyEmail = async (req, res) => {
  const token = req.query.token;
  const emailTokenVerify = await User.findOne({ emailToken: token });
  const userVerify = {
    emailToken: null,
    isVerified: true,
  };
  const verify = await User.findOneAndUpdate(
    { emailToken: token },
    { $set: userVerify }
  );
  try {
    res.status(200).json({
      message: "Email is not verfied or You have already verified your account",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.bookmark = async (req, res) => {
  const token = req.headers.token;
  const userId = jwt.verify(token, "UtopiaApiUser@");
  const bookMark = await User.findByIdAndUpdate(userId.id).populate(
    "favpost.post"
  );
  try {
    let bookmarkFilter = [];
    bookMark.favpost.filter((post) => bookmarkFilter.push(post.post));
    res.status(200).json({
      message: "BookMark Filter",
      bookmark: bookmarkFilter,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
