const mongoose = require("mongoose");
const localDB = "mongodb://0.0.0.0:27017/auth";

const connectDB = () => {
  try {
    mongoose.connect(localDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
