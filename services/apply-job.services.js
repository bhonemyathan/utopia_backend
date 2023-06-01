const Apply = require("../models/apply.model");
const Job = require("../models/job.model");
const Employer = require("../models/employer.model");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.ApplyJobForm = async (req, res) => {
  const id = req.params.id;
  const getJobInfo = await Job.findOne({ _id: id });
  try {
    res.status(200).json({
      jobInfo: getJobInfo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.ApplyJob = async (req, res) => {
  const token = req.headers.token;
  const {
    name,
    id,
    phno,
    qualification,
    experience,
    currency,
    salary,
    cvletter,
    job,
  } = req.body;
  const userId = jwt.verify(token, "UtopiaApiUser@");
  try {
    let apply = new Apply();
    apply.name = name;
    apply.applyer = userId.id;
    apply.author = id;
    apply.mobileno = phno;
    apply.qualification = qualification;
    apply.experience = experience;
    apply.currency = currency;
    apply.salary = salary;
    apply.cvletter = cvletter;
    apply.job = job;
    apply.cv = "/cv/" + req.file.filename;
    const applySave = await apply.save();
    const employerId = await Employer.findOne({ _id: id });
    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "utopiateammanagement@gmail.com",
        pass: "dykdykgllouepvmf",
      },
    });

    let mailDetail = {
      from: "User Request <Utopia Admin Team>",
      to: employerId.email,
      subject: "User Request",
      html: `<div style="display: flex;justify-content: center;align-items: center;"><div style="width: 400px;height: 500px;background: ;"><center><img src="https://static.thenounproject.com/png/1063966-200.png" width="60px" height="60px" style="margin-top: 20px;"><h1 style="text-align: center;">Job Request</h1></center><h3>Dear, ${employerId.name} </h3><p>There is a new user who want to apply your job.</p><p>Thank you for your support. We always appreciate that.</p><p>-UTOPIA Admin Team</p></div></div>`,
    };

    mailTransporter.sendMail(mailDeail, (error, data) => {
      if (error) {
        res.status(502).json({
          message: "Error Occurs",
          error: error,
        });
      } else {
        res.status(200).json({
          message: "Email sent successfully",
        });
      }
    });
    return res.status(200).json({
      message: "Applied Job!",
      info: applySave,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
