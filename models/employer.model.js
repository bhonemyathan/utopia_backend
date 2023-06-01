const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const Schema = mongoose.Schema;

const EmployerSchema = new Schema({
  companyLogo: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

EmployerSchema.pre("save", function (next) {
  this.password = bcryptjs.hashSync(
    this.password,
    bcryptjs.genSaltSync(8),
    null
  );
  next();
});

EmployerSchema.statics.compare = function (cleartext, encrypted) {
  return bcryptjs.compareSync(cleartext, encrypted);
};

module.exports = mongoose.model("Employers", EmployerSchema);
