const validator = require("validator");

module.exports = async (req, res, next) => {
  const checkPassword = validator.isStrongPassword(req.body.newpassword);
  checkPassword === false
    ? res
        .status(422)
        .json({
          message:
            "Your password should be Uppercase,Lowercase,Special Characters,Number and a-z or A-Z and minLength: 8",
        })
    : next();
};
