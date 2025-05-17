const jwt = require('jsonwebtoken');
const jwtSecretKey = process.env.JWT_SECRET || "hireMe2025";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

const authorizeAdmin = (req, res, next) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied. Admins only.' });
    }
    next();
};

const authorizeEmployee = (req, res, next) => {
    if (req.user?.role !== 'employee') {
        console.log(req.user.role);
        return res.status(403).json({ error: 'Access denied. Employees only.' });
    }
    next();
};


const authorizeEmployeeOrAdmin = (req, res, next) => {
    if (req.user?.role !== 'employee' && req.user?.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied. Employees or Admins only.' });
    }
    next();
};


module.exports = { authenticateToken, authorizeAdmin, authorizeEmployee, authorizeEmployeeOrAdmin };