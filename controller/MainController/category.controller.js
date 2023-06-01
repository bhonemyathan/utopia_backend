const Category = require("../../models/category.model");
const User = require("../../models/user.model");
const Job = require("../../models/job.model");
const Location = require("../../models/location.model");
const jwt = require("jsonwebtoken");

exports.categoryList = async (req, res) => {
  const category = await Category.find({});
  try {
    res.status(200).json({
      category: category,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.categoryPosts = async (req, res) => {
  const category = req.params.category;
  const token = req.headers.token;
  const userId = jwt.verify(token, "UtopiaApiUser@");
  const postList = await Job.find({ category: category });
  const categoryList = await Category.find({});
  const locationList = await Location.find({});
  const favoriteCheck = await User.findOne({ _id: userId.id });
  try {
    console.log(favoriteCheck.favpost);
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
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
