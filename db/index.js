const mongoose = require("mongoose");

//requiring the packages and running it once no need to store it, loads all the environment variables
require("dotenv").config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to Mongo DB!");
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

module.exports = { connectDB };
