const express = require('express');
const { Patient, Doctor } = require('../dbSchema/doctor&patientSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Patient Signup
router.post('/patient-signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if patient already exists
    let patient = await Patient.findOne({ email });
    if (patient) {
      return res.status(400).json({ message: 'Patient already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new patient
    patient = new Patient({
      username,
      email,
      password: hashedPassword
    });

    await patient.save();

    // Create token
    const token = jwt.sign(
      { id: patient._id, type: 'patient' }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    res.status(201).json({ token, userId: patient._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during patient signup', error: error.message });
  }
});

// Doctor Signup
router.post('/doctor-signup', async (req, res) => {
  try {
    const { name, email, password, specialization } = req.body;
    
    // Check if doctor already exists
    let doctor = await Doctor.findOne({ email });
    if (doctor) {
      return res.status(400).json({ message: 'Doctor already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new doctor
    doctor = new Doctor({
      username: name,
      email,
      password: hashedPassword,
      specialization
    });

    await doctor.save();

    // Create token
    const token = jwt.sign(
      { id: doctor._id, type: 'doctor' }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    res.status(201).json({ token, userId: doctor._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during doctor signup', error: error.message });
  }
});

// Patient Login
router.post('/patient-login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find patient by email
    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign(
      { id: patient._id, type: 'patient' }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    res.json({ 
      token, 
      userId: patient._id,
      username: patient.username 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during patient login' });
  }
});

// Doctor Login
router.post('/doctor-login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find doctor by email
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign(
      { id: doctor._id, type: 'doctor' }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    res.json({ 
      token, 
      userId: doctor._id,
      username: doctor.username,
      specialization: doctor.specialization 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during doctor login' });
  }
});

module.exports = router;