const Job = require("../models/job.model");

exports.recentPosts = async (req, res) => {
  const recentPost = await Job.find({ status: "approve" }).limit(3);
  try {
    res.status(200).json({
      recentpost: recentPost,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
