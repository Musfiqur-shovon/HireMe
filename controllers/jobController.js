const jobModel = require('../models/jobModel');


exports.createJob = async (req, res) => {
  try {
    const jobs = await jobModel.create(req.body);
    res.status(201).json({ message: 'User Created Successfully...', jobs });
  } catch (err) {
    res.status(500).json({ message: 'Server Error Found', error: err.message });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await jobModel.find();
    res.status(200).json({ success: true, jobs });
  } catch (err) {
    res.status(500).json({ message: 'Server Error Found', error: err.message });
  }
};

exports.getAllJobsByID = async (req, res) => {
  try {
    const jobs = await jobModel.findById(req.params.id);
    if (!jobs) return res.status(404).json({message : "Job Not Found"});
    res.status(200).json({ success: true, jobs });
  } catch (err) {
    res.status(500).json({ message: 'Server Error Found', error: err.message });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const updated = await jobModel.findByIdAndUpdate(req.params.id, req.body);
    if (!updated) return res.status(404).json({message : "Job Not Found"});
    res.status(200).json({ message : "Job Updated Successfully." });
  } catch (err) {
    res.status(500).json({ message: 'Server Error Found', error: err.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const deleted = await jobModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({message: 'Job not found & Unable to Delete' });
    res.status(200).json({message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error Found', error: err.message });
  }
};
