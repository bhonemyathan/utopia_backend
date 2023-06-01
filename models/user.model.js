// const mongoose = require("mongoose");
// const bcryptjs = require("bcryptjs");

// const Schema = mongoose.Schema;

// const UserSchema = new Schema({
//   image: {
//     type: String,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   status: {
//     type: String,
//   },
//   bio: {
//     type: String,
//   },
//   position: {
//     type: String,
//   },
//   experiment: {
//     type: String,
//   },
//   address: {
//     type: String,
//   },
//   city: {
//     type: String,
//   },
//   country: {
//     type: String,
//   },
//   graduatedPlace: {
//     type: String,
//   },
//   degree: {
//     type: String,
//   },
//   emailToken: {
//     type: String,
//   },
//   isVerified: {
//     type: Boolean,
//   },
//   createdDate: {
//     type: Date,
//     default: Date.now(),
//   },
//   favpost: [
//     {
//       post: {
//         type: Schema.Types.ObjectId,
//         ref: "Jobs",
//       },
//     },
//   ],
// });

// UserSchema.pre("save", function (next) {
//   this.password = bcryptjs.hashSync(
//     this.password,
//     bcryptjs.genSaltSync(8),
//     null
//   );
//   next();
// });

// UserSchema.statics.compare = function (cleartext, encrypted) {
//   return bcryptjs.compareSync(cleartext, encrypted);
// };

// module.exports = mongoose.model("Users", UserSchema);
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  image: {
    type: String,
  },
  name: {
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
  status: {
    type: String,
  },
  bio: {
    type: String,
  },
  position: {
    type: String,
  },
  exp: {
    type: String,
  },
  emp_status: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  edulocation: {
    type: String,
  },
  eduuni: {
    type: String,
  },
  edudegree: {
    type: String,
  },
  emailToken: {
    type: String,
  },
  isVerified: {
    type: Boolean,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  favpost: [
    {
      post: {
        type: Schema.Types.ObjectId,
        ref: "Jobs",
      },
    },
  ],
});

UserSchema.pre("save", function (next) {
  this.password = bcryptjs.hashSync(
    this.password,
    bcryptjs.genSaltSync(8),
    null
  );
  next();
});

UserSchema.statics.compare = function (cleartext, encrypted) {
  return bcryptjs.compareSync(cleartext, encrypted);
};

module.exports = mongoose.model("Users", UserSchema);
