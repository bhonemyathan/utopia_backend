const Job = require("../../models/job.model");
const Category = require("../../models/category.model");
const Location = require("../../models/location.model");
const User = require("../../models/user.model");
const jwt = require("jsonwebtoken");

exports.postDetail = async (req, res) => {
  const id = req.params.id;
  const token = req.headers.token;
  const userId = jwt.verify(token, "UtopiaApiUser@");
  const postCheck = await Job.findById(id);
  const categoryList = await Category.find({});
  const locationList = await Location.find({});
  const favoriteCheck = await User.findOne({ _id: userId.id });
  try {
    let favoriteFilter;
    favoriteFilter = favoriteCheck.favpost.filter((data) => {
      return data.post == postCheck._id.toString();
    });
    res.status(200).json({
      postdetail: postCheck,
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
