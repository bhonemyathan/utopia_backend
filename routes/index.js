const router = require("express").Router();
const indexController = require("../controller/MainController/index.controller");
const postController = require("../controller/MainController/post.controller");
const categoryController = require("../controller/MainController/category.controller");
const areaController = require("../controller/MainController/area.controller");
const userVerify = require("../middleware/check.user.verify");
const userAuth = require("../middleware/check.user.auth");
const { recentPosts } = require("../services/post-detail.services");
const searchService = require("../services/search.services");
const { ApplyJobForm, ApplyJob } = require("../services/apply-job.services");
const {
  loginUser,
  registerUser,
  duplicateEmailCheck,
} = require("../services/login.services");
const {
  registerValidator,
  resetPasswordValidator,
} = require("../validator/login.validator");
const multer = require("multer");
const cvFile = multer({ dest: "public/cv/" });

router.get("/", indexController.index);

router.post("/register", registerValidator, registerUser);

router.post("/login", userVerify, loginUser);

router.post("/forgot-password", indexController.forgotPassword);

router.get("/reset-password/:id/:token", indexController.resetPasswordPage);

router.post(
  "/reset-password/:id/:token",
  resetPasswordValidator,
  indexController.resetPassword
);

router.post("/duemailcheck", duplicateEmailCheck);

router.get("/job/:id", postController.postDetail);

router.get("/recent-posts", recentPosts);

router.get("/category", categoryController.categoryList);

router.get("/category/:category", categoryController.categoryPosts);

router.get("/location/:area", areaController.areaPosts);

router.get("/search", searchService);

router.get("/apply-job/:id", userAuth, ApplyJobForm);

router.post("/apply-job/:id", userAuth, cvFile.single("attachcv"), ApplyJob);

module.exports = router;
