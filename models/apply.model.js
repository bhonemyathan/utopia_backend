const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApplySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  job: {
    type: Schema.Types.ObjectId,
    ref: "Jobs",
  },
  applyer: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "Employers",
  },
  mobileno: {
    type: Number,
    required: true,
  },
  qualification: {
    type: String,
  },
  experience: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  cvletter: {
    type: String,
    required: true,
    maxLength: 2000,
  },
  cv: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Apply", ApplySchema);
