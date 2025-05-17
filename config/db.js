const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.dbURL);
    console.log('Database Connected Sucessfully...');
  } catch (err) {
    console.error('Database Error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
