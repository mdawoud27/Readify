const mongoose = require("mongoose");

async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to Mongodb");
  } catch (error) {
    console.error(`Cannot able to connect...\n${error.message}`);
  }
}

module.exports = { connectToMongoDB };
