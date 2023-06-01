const userName = "utopia";
const passWord = "utopiaAdminTeam@#";
const jwt = require("jsonwebtoken");
const JWT_ADMIN_TOKEN = "UtopiaApiAdmin@";

module.exports = async (req, res) => {
  const { username, password } = req.body;
  const token = jwt.sign(
    { name: userName, password: passWord },
    JWT_ADMIN_TOKEN,
    { expiresIn: "30d" }
  );
  if (username === userName && password === passWord) {
    res.status(200).json({
      message: "Login admin",
      header_token: token,
    });
  } else {
    res.status(403).json({
      message: "Username or password is not match",
    });
  }
};
