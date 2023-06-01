const mongoose = require("mongoose");

const databaseConnect = () => {
  mongoose.connect(
    "mongodb+srv://bhonemyathan:bhonemyathan2682004@utopia.yc6qeok.mongodb.net/?retryWrites=true&w=majority"
  );
  // mongoose.connect("mongodb://127.0.0.1/utopia");
  var db = mongoose.connection;
  db.on(
    "error",
    console.error.bind("Cloud Database connection error at Database")
  );
  db.on("connected", () => {
    console.log("Cloud Database connected!");
  });
};

module.exports = databaseConnect;
