const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected ${connect.connection.host}`);
  } catch (errror) {
    console.log(errror);
    process.exit();
  }
};

module.exports=connectDB;
