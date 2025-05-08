const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(`DB connected successfully`);
  } catch (error) {
    console.log(`Error connecting to DB : ${error.message}`);
  }
};

module.exports = connectDB;
