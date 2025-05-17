const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'jobmodels',
    required: true
  },
  applicantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  cv: {
    type: String, 
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accept', 'reject'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['paid', 'unpaid'],
    default : 'unpaid'
  },
  invoice: {
    id: String,
    amount: Number,
    paymentMethod : String,
    time: Date
  }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
