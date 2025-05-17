const express = require('express');
const router = express.Router();
const { registerUser, getAllUsers, loginUser, getDashboard } = require('../controllers/userController');
const {authenticateToken, authorizeAdmin} = require("../middleware/authController");




router.get('/dashboard', authenticateToken, getDashboard);
router.post('/login', loginUser);
router.get('/view', authenticateToken, authorizeAdmin,  getAllUsers);
router.post('/create', registerUser);


module.exports = router;
