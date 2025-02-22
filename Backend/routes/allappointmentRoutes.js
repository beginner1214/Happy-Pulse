const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const AllAppointments = require("../dbSchema/AllAppointmentsSchema");
const mongoose = require("mongoose");

// Get all appointments (admin only)
router.get("/", auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.type !== 'admin') {
      return res.status(403).json({ message: "Access denied: Admin only" });
    }

    const appointments = await AllAppointments.find()
      .populate("patient", "name email")
      .populate("doctor", "name specialty")
      .sort("-createdAt");

    res.json(appointments);
  } catch (error) {
    console.error("Error fetching all appointments:", error);
    res.status(500).json({
      message: "Error fetching appointments",
      error: error.message
    });
  }
});