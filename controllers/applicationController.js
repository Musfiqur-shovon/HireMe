const Application = require('../models/applicationModel');
const fs = require('fs');
const path = require('path');

exports.createApplication = async (req, res) => {
  try {
    const app = await Application.create(req.body);
    res.status(201).json({ message: 'Application Submitted Successfully', app });
  } catch (err) {
    res.status(500).json({ message: 'Server Error Found', error: err.message });
  }
};


exports.updateApplication = async (req, res) => {
  try {
    const updated = await Application.findByIdAndUpdate(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Data Not Found'});
    res.status(201).json({ message: 'Application Submitted Successfully'});
  } catch (err) {
    res.status(500).json({ message: 'Server Error Found', error: err.message });
  }
};

exports.getAllApplication = async (req, res) => {
  try {
    let applications;

    if (req.user.role === 'admin') {
      applications = await Application.find();
    } else if (req.user.role === 'employee') {
      console.log(req.user.id);
      applications = await Application.find({ jobId: req.user.id });
      console.log(applications);
    } else {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    res.status(200).json({ success: true, applications });
  } catch (err) {
    res.status(500).json({ message: 'Server Error Found', error: err.message });
  }
};


exports.uploadCVAndPay = async (req, res) => {
  try {
    const { jobId } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'CV file is required' });
    }

    //const isPaymentSuccessful = req.body.payment === 'success'; 

    if (!isPaymentSuccessful) {
      const filePath = path.join(__dirname, '..', req.file.path);
      fs.unlink(filePath, err => {
        if (err) console.error('Failed to delete file:', err);
      });
      return res.status(402).json({ success: false, message: 'Payment failed. Application not submitted.' });
    }

    // Payment Invoice data
    const invoice = {
      id: 'INV-' + Date.now(),
      amount: 100,
      paymentMethod: 'mock_bkash',
      time: new Date()
    };

    const application = new Application({
      jobId,
      applicantId: req.user.id,
      cv: `/uploads/cv/${req.file.filename}`,
      status: 'pending',
      paymentStatus: 'paid',
      invoice
    });

    await application.save();

    res.status(201).json({ success: true, message: 'Application submitted successfully', application });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};


