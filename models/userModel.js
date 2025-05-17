const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['admin', 'employee', 'jobseeker'],
    required: true
  },
  company: {
    type: String,
    default: null, // Admins and jobseekers might not belong to a company
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('User', userSchema);

