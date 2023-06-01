const jwt = require("jsonwebtoken");
const JWT_ADMIN_TOKEN = "UtopiaApiAdmin@";

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.token;
    const decodeToken = jwt.verify(token, JWT_ADMIN_TOKEN);
    next();
  } catch (error) {
    res.status(401).json({
      message: "Auth Failed",
    });
  }
};
