const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.headers.token;
  const userId = jwt.verify(token, "UtopiaApiUser@");
  const getUser = await User.findOne({ _id: userId.id });
  try {
    const passwordMatch = await User.compare(
      req.body.oldpassword,
      getUser.password
    );
    next();
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Errors",
    });
  }
};
