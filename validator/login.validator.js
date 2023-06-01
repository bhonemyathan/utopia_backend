const validator = require("validator");

exports.registerValidator = (req, res, next) => {
  const emailCheck = validator.isEmail(req.body.email);
  const passwordCheck = validator.isStrongPassword(req.body.password);
  emailCheck === false
    ? res.status(422).json({ message: "Incorrect Email Format" })
    : passwordCheck === false
    ? res.status(422).json({
        message:
          "Your password should be Uppercase,Lowercase,Special Characters,Number and a-z or A-Z and minLength: 8",
      })
    : next(); // don't try like this
};

exports.resetPasswordValidator = (req, res, next) => {
  const passwordCheck = validator.isStrongPassword(req.body.password);
  passwordCheck === false
    ? res.status(422).json({
        message:
          "Your password should be Uppercase,Lowercase,Special Characters,Number and a-z or A-Z and minLength: 8",
      })
    : next();
};
