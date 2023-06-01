const Job = require("../models/job.model");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const Search = async (req, res) => {
  const title = req.query.title;
  const category = req.query.category;
  const location = req.query.location;
  const token = req.headers.token;
  const userId = jwt.verify(token, "UtopiaApiUser@");
  const favoriteCheck = await User.findOne({ _id: userId.id });
  const searchResult = await Job.find({
    $and: [
      { jobtitle: { $regex: title, $options: "i" } },
      { category: { $regex: category, $options: "i" } },
      { location: { $regex: location, $options: "i" } },
    ],
    $or: [
      { jobtitle: { $regex: title, $options: "i" } },
      { category: { $regex: category, $options: "i" } },
      { location: { $regex: location, $options: "i" } },
    ],
    status: "approve",
  });

  try {
    let favoriteFilter = [];
    favoriteCheck.favpost.filter((data) => {
      favoriteFilter.push(data.post);
    });
    res.status(200).json({
      result: searchResult,
      favStatus: favoriteFilter,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = Search;
