const router = require("express").Router();
const multer = require("multer");
const {
  userPanel,
  userPanelSetting,
  userPanelUpdateSetting,
  changePassword,
  verifyEmail,
  bookmark,
} = require("../controller/UserController/panel.controller");
const userAuth = require("../middleware/check.user.auth");
const checkPassword = require("../services/check-password.services");
const checkNewPassword = require("../validator/changepwd.validator");
const profile = multer({ dest: "public/images/profile" });

router.get("/", userAuth, userPanel);

router.get("/user-setting", userAuth, userPanelSetting);

router.post(
  "/user-setting",
  userAuth,
  profile.single("profile"),
  userPanelUpdateSetting
);

router.post(
  "/change-password",
  userAuth,
  checkPassword,
  checkNewPassword,
  changePassword
);

router.get("/verify-email", verifyEmail);

router.get("/bookmark", userAuth, bookmark);

module.exports = router;
