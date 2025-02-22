const jwt = require('jsonwebtoken');
const { Doctor, Patient } = require('../dbSchema/doctor&patientSchema');
require('dotenv').config();

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // { id, type }

    console.log('Decoded Token:', decoded);
 
    let user;
    if (decoded.type === 'doctor') {
      user = await Doctor.findById(decoded.id);
    } else if (decoded.type === 'patient') {
      user = await Patient.findById(decoded.id);
    } else {
      return res.status(401).json({ message: 'Invalid user type in token.' });
    }

    if (!user) {
      return res.status(401).json({ message: 'User not found. Invalid token.' });
    }

    console.log('Authenticated User:', { id: user._id, type: decoded.type });
    
    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error.message);
    res.status(400).json({ message: 'Invalid token.', error: error.message });
  }
};

module.exports = auth;
