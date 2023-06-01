const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.token;
    const decodeToken = jwt.verify(token, "UtopiaApiEmployer@");
    next();
  } catch (error) {
    res.status(401).json({
      message: "Auth Failed!",
    });
  }
};
