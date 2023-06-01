const Employer = require("../../models/employer.model");

exports.createEmployer = async (req, res) => {
  const { cpName, email, password } = req.body;
  console.log(req.body);
  let employer = new Employer();
  employer.companyName = cpName;
  employer.email = email;
  employer.password = password;
  if (req.file) {
    employer.companyLogo = "/images/company/" + req.file.filename;
  }
  const employerSave = await employer.save();
  try {
    res.status(200).json({
      message: "Employer Account Created",
      info: employerSave,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.employerDelete = async (req, res) => {
  const deleteEmployer = await Employer.findOneAndDelete({
    _id: req.params.id,
  });
  try {
    res.status(200).json({
      message: "Employer deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
