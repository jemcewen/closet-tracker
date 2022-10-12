const mongoose = require('mongoose');

const dbUrl = process.env.DB_URL;

const connectDB = async () => {
  try {
    const db = await mongoose.connect(dbUrl);
    console.log(`MongoDB Connected: ${db.connection.host}`);
  }
  catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = connectDB;