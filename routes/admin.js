const router = require("express").Router();
const adminLogin = require("../services/admin-login.services");
const adminAuth = require("../middleware/check.admin.auth");
const {
  dashboardPanel,
  userList,
  userDetail,
  employerList,
  userDelete,
  categoryList,
  categoryAdd,
  categoryDelete,
  locationList,
  locationAdd,
  locationDelete,
} = require("../controller/AdminController/dashboard.controller");
const {
  createEmployer,
  employerDelete,
} = require("../controller/AdminController/employer.controller");
const {
  jobList,
  jobPending,
  jobApprove,
  jobCancel,
  jobDelete,
} = require("../controller/AdminController/job.controller");
const multer = require("multer");
const companyLg = multer({ dest: "public/images/company" });

router.get("/", adminAuth, dashboardPanel);

router.post("/login", adminLogin);

router.get("/userlist", adminAuth, userList);

router.get("/userdetail/:id", adminAuth, userDetail);

router.post(
  "/create-employer",
  companyLg.single("cpLogo"),
  adminAuth,
  createEmployer
);

router.get("/employerlist", adminAuth, employerList);

router.get("/employerdelete/:id", adminAuth, employerDelete);

router.get("/userdelete/:id", adminAuth, userDelete);

router.get("/category", adminAuth, categoryList);

router.post("/categoryAdd", adminAuth, categoryAdd);

router.get("/categorydelete/:id", adminAuth, categoryDelete);

router.get("/location", adminAuth, locationList);

router.post("/locationAdd", adminAuth, locationAdd);

router.get("/locationdelete/:id", adminAuth, locationDelete);

router.get("/joblist", adminAuth, jobList);

router.get("/jobpending", adminAuth, jobPending);

router.get("/jobapprove/:id", adminAuth, jobApprove);

router.get("/jobcancel/:id", adminAuth, jobCancel);

router.get("/jobdelete/:id", adminAuth, jobDelete);

module.exports = router;
