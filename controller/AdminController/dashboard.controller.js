const Job = require("../../models/job.model");
const User = require("../../models/user.model");
const Location = require("../../models/location.model");
const Category = require("../../models/category.model");
const Employer = require("../../models/employer.model");

exports.dashboardPanel = async (req, res) => {
  const userCount = await User.countDocuments({});
  const jobCount = await Job.countDocuments({ status: "approve" });
  const jobPending = await Job.countDocuments({ status: "pending" });
  const locationCount = await Location.countDocuments({});
  const categoryCount = await Category.countDocuments({});
  try {
    res.status(200).json({
      message: "Dashboard",
      user: userCount,
      job: jobCount,
      jobpending: jobPending,
      location: locationCount,
      category: categoryCount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.userList = async (req, res) => {
  const userList = await User.find({});
  try {
    res.status(200).json({
      message: "User List",
      userlist: userList,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.userDetail = async (req, res) => {
  const detailUser = await User.findOne({ _id: req.params.id });
  try {
    res.status(200).json({
      message: "User Detail",
      detail: detailUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.employerList = async (req, res) => {
  const employer = await Employer.find({});
  try {
    res.status(200).json({
      message: "Employer List",
      employer: employer,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.userDelete = async (req, res) => {
  const deleteUser = await User.findOneAndDelete({ _id: req.params.id });
  try {
    res.status(200).json({
      message: "User Account Delected",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.categoryList = async (req, res) => {
  const category = await Category.find({});
  try {
    res.status(200).json({
      message: "Category List",
      category: category,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.categoryAdd = async (req, res) => {
  let category = new Category();
  category.name = req.body.categoryname;
  const categorySave = await category.save();
  try {
    res.status(200).json({
      message: "Category added",
      info: categorySave,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.categoryDelete = async (req, res) => {
  const deleteCategory = await Category.findOneAndDelete({
    _id: req.params.id,
  });
  try {
    res.status(200).json({
      message: "Category deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.locationList = async (req, res) => {
  const location = await Location.find({});
  try {
    res.status(200).json({
      message: "Location List",
      location: location,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.locationAdd = async (req, res) => {
  let location = new Location();
  location.name = req.body.locationname;
  const locationSave = await location.save();
  try {
    res.status(200).json({
      message: "Location Added",
      location: locationSave,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.locationDelete = async (req, res) => {
  const deleteLocation = await Location.findOneAndDelete({
    _id: req.params.id,
  });
  try {
    res.status(200).json({
      message: "Location Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
