const express = require('express');
const router = express.Router();
const { createApplication, updateApplication, getAllApplication, uploadCVAndPay } = require('../controllers/applicationController');
const {authenticateToken, authorizeEmployee} = require("../middleware/authController");
const uploadCV = require('../middleware/uploadCV');


router.get('/view',authenticateToken, getAllApplication);
//router.get('/view/:id',authenticateToken, getAllApplication);
router.post('/create', createApplication);
router.put('/update/:id', authenticateToken, authorizeEmployee, updateApplication);
router.post('/uploadCV', uploadCV.single('cv'), uploadCVAndPay);
//router.delete('/delete/:id', deleteJob);



module.exports = router;