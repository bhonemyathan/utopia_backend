const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = new Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  companyDescription: {
    type: String,
    required: true,
  },
  jobTime: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "Employers",
  },
  createDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Jobs", JobSchema);
// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const JobSchema = new Schema({
//   jobtitle: {
//     type: String,
//     required: true,
//   },
//   company: {
//     type: String,
//     required: true,
//   },
//   cpdes: {
//     type: String,
//     required: true,
//   },
//   jobtime: {
//     type: String,
//     required: true,
//   },
//   salary: {
//     type: String,
//     required: true,
//   },
//   location: {
//     type: String,
//     required: true,
//   },
//   jobdes: {
//     type: String,
//     required: true,
//   },
//   companylogo: {
//     type: String,
//   },
//   category: {
//     type: String,
//     required: true,
//   },
//   status: {
//     type: String,
//     required: true,
//   },
//   author: {
//     type: Schema.Types.ObjectId,
//     ref: "Users",
//   },
//   create: {
//     type: Date,
//     default: Date.now(),
//   },
// });

// module.exports = mongoose.model("Jobs", JobSchema);
