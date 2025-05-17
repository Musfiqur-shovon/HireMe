const express = require('express');
const pool = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

// Connect to DB
pool();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes Files
const userRoutes = require('./routes/userRoute');
const jobRoutes = require('./routes/jobRoute');
const applicationRoutes = require('./routes/applicationRoute');

//Routes Api
app.use('/api/users', userRoutes);
app.use('/api/job', jobRoutes);
app.use('/api/application', applicationRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port :  http://localhost:${PORT}`);
});
