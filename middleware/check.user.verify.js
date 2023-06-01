const User = require("../models/user.model");

module.exports = async (req, res, next) => {
  const userVerify = await User.findOne({ email: req.body.email });
  try {
    userVerify.isVerified
      ? next()
      : res.status(406).json({
          message: "User account is not verify",
        });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
