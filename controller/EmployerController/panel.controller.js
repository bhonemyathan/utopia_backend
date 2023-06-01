const Employer = require("../../models/employer.model");
const Job = require("../../models/job.model");
const Location = require("../../models/location.model");
const Category = require("../../models/category.model");
const Apply = require("../../models/apply.model");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.employerLogin = async (req, res) => {
  const { email, password } = req.body;
  const employerCheck = await Employer.findOne({ email: email });
  try {
    if (
      employerCheck != null &&
      Employer.compare(password, employerCheck.password)
    ) {
      const token = jwt.sign(
        {
          email: employerCheck.email,
          id: employerCheck._id,
        },
        "UtopiaApiEmployer@",
        { expiresIn: "30d" }
      );
      res.status(200).json({
        message: "Login Success",
        token: token,
        info: employerCheck,
      });
    } else {
      res.status(400).json({
        message: "Email or Password is wrong",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.dashboardPanel = async (req, res) => {
  const employerId = jwt.verify(req.headers.token, "UtopiaApiEmployer@");
  const applyerCount = await Apply.countDocuments({ author: employerId.id });
  const jobCount = await Job.countDocuments({ author: employerId.id });
  try {
    res.status(200).json({
      message: "Dashboard",
      appCount: applyerCount,
      jobCount: jobCount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.jobAdd = async (req, res) => {
  const { jobtitle, cpdesc, jobtime, salary, location, jobdesc, category } =
    req.body;
  const authorId = jwt.verify(req.headers.token, "UtopiaApiEmployer@");
  let job = new Job();
  job.jobTitle = jobtitle;
  job.companyDescription = cpdesc;
  job.author = authorId.id;
  job.jobTime = jobtime;
  job.salary = salary;
  job.location = location;
  job.category = category;
  job.jobDescription = jobdesc;
  job.status = "pending";
  const jobSave = await job.save();
  try {
    res.status(200).json({
      message: "Job Uploaded",
      jobDetail: jobSave,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.jobList = async (req, res) => {
  const employerId = jwt.verify(req.headers.token, "UtopiaApiEmployer@");
  const list = await Job.find({ author: employerId.id });
  try {
    res.status(200).json({
      message: "List",
      list: list,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.jobDelete = async (req, res) => {
  const deleteJob = await Job.findOneAndDelete({ _id: req.params.id });
  try {
    res.status(200).json({
      message: "Job deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.jobRequest = async (req, res) => {
  const employerId = jwt.verify(req.headers.token, "UtopiaApiEmployer@");
  const ApplyInfo = await Apply.find({ author: employerId.id });
  try {
    res.status(200).json({
      message: "Job Request",
      request: ApplyInfo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.applyDelete = async (req, res) => {
  const deleteApply = await Apply.findById(req.params.id)
    .populate("applyer")
    .populate("job");
  try {
    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "utopiateammanagement@gmail.com",
        pass: "dykdykgllouepvmf",
      },
    });

    let mailDetail = {
      from: "Decline Your CV Form <utopiateammanagement@gmail.com>",
      to: deleteApply.applyer.email,
      subject: `Vacancy for [${deleteApply.job.jobtitle}]`,
      html: `<div style="display: flex;justify-content: center;align-items: center;"><div style="width: 400px;height: 500px;background: ;"><center><img src="https://uploads-ssl.webflow.com/595674410b929045cbbf9368/6062e681d4b77b2556af2aa8_Website%20Featured%20image.png" width="60px" height="60px" style="margin-top: 20px;"><h1 style="text-align: center;">Rejected Your CV Form</h1></center><h3>Dear,${deleteApply.applyer.name}</h3><p>Thank you for your submitting your CV and cover letter for the position of [${deleteApply.job.jobtitle}]</p><p>Although we were highly impressed with your skills and proven work experience, we believe it doesn't align with our niche focus at this time.</p><p>However, we do believe that you are a capable professional with clear talent and we would encourage you to apply for future positions.</p><p>We wish you good luck in your job search and your professional success.</p><p>Yours sincerely,</p><p>${deleteApply.author.companyName}</div></div>`,
    };
    mailTransporter.sendMail(mailDetail, (err, data) => {
      if (err) {
        res.status(500).json({
          message: "Email occurs",
        });
      } else {
        res.status(200).json({
          message: "Email sent success",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
