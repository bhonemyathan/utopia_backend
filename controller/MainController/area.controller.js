const Location = require("../../models/location.model");
const User = require("../../models/user.model");
const Job = require("../../models/job.model");
const Category = require("../../models/category.model");
const jwt = require("jsonwebtoken");

exports.areaPosts = async (req, res) => {
  const area = req.params.area;
  const token = req.headers.token;
  const userId = jwt.verify(token, "UtopiaApiUser@");
  const postList = await Job.find({ location: area });
  const locationList = await Location.find({});
  const categoryList = await Category.find({});
  const favoriteCheck = await User.findOne({ _id: userId.id });
  try {
    let favoriteFilter = [];
    favoriteCheck.favpost.filter((data) => {
      favoriteFilter.push(data.post);
    });
    res.status(200).json({
      joblist: postList,
      category: categoryList,
      location: locationList,
      favStatus: favoriteFilter,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
