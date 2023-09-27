const mongoose = require('mongoose');

// requiring the packages & running it once no need to store it, loads all the environment variables
require('dotenv').config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // eslint-disable-next-line no-console
    console.log('Connected to Mongo DB!');
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    process.exit(1);
  }
}

module.exports = { connectDB };
