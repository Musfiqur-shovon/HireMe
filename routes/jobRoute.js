const express = require('express');
const router = express.Router();
const { createJob, getAllJobs, getAllJobsByID, updateJob, deleteJob } = require('../controllers/jobController');



router.get('/view', getAllJobs);
router.get('/view/:id', getAllJobsByID);
router.post('/create', createJob);
router.put('/update/:id', updateJob);
router.delete('/delete/:id', deleteJob);

module.exports = router;
