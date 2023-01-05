const mongoose = require("mongoose");

//MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
