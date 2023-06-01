const router = require("express").Router();
const employerAuth = require("../middleware/check.employer.auth");
const {
  employerLogin,
  dashboardPanel,
  jobAdd,
  jobList,
  jobDelete,
  jobRequest,
  applyDelete,
} = require("../controller/EmployerController/panel.controller");

router.get("/", employerAuth, dashboardPanel);

router.post("/login", employerLogin);

router.post("/jobadd", employerAuth, jobAdd);

router.get("/joblist", employerAuth, jobList);

router.get("/jobdelete/:id", employerAuth, jobDelete);

router.get("/jobrequest", employerAuth, jobRequest);

router.get("/applydelete/:id", employerAuth, applyDelete);

module.exports = router;
