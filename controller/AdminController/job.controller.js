const Job = require("../../models/job.model");
const Category = require("../../models/category.model");
const fs = require("fs");

exports.jobList = async (req, res) => {
  const list = await Job.find({});
  try {
    res.status(200).json({
      message: "Job list",
      list: list,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.jobPending = async (req, res) => {
  const jobpending = await Job.find({ status: "pending" });
  try {
    res.status(200).json({
      message: "Job pending",
      job: jobpending,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.jobApprove = async (req, res) => {
  const approve = await Job.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { status: "approved" } }
  );
  const categoryCount = await Category.findOne({ name: approve.category });
  const categoryAdd = await Category.findOneAndUpdate(
    { name: approve.category },
    { $set: { count: categoryCount.count + 1 } }
  );
  try {
    res.status(200).json({
      message: "Approved",
      category: categoryAdd,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.jobCancel = async (req, res) => {
  const cancel = await Job.findOneAndDelete({ _id: req.params.id });
  try {
    res.status(200).json({
      message: "Job requested cancel",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.jobDelete = async (req, res) => {
  const del = await Job.findOneAndDelete({ _id: req.params.id });
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
