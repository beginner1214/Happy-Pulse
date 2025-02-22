const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Appointment = require("../dbSchema/AppointmentSchema");
const AllAppointments = require("../dbSchema/AllAppointmentsSchema");
const mongoose = require("mongoose");
const Doctorsreal = require("../dbSchema/doctorSchema");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

// Verify email configuration on startup
transporter.verify(function (error, success) {
  if (error) {
    console.log("Error verifying email configuration:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

// Get appointments for logged-in patient
router.get("/booking", auth, async (req, res) => {
  try {
    console.log("Patient appointments request received");

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    const appointments = await Appointment.find({ "patient._id": req.user.id })
      .populate("doctor", "name specialty location image rating")
      .sort("-createdAt");

    if (!appointments.length) {
      return res.status(404).json({ message: "No appointments found" });
    }

    res.json(appointments);
  } catch (error) {
    console.error("Error in /booking route:", error);
    res.status(500).json({
      message: "Error fetching appointments",
      error: error.message,
    });
  }
});

// Create new doctor
router.post("/doctors", async (req, res) => {
  try {
    const { name, specialization, location, image, rating } = req.body;
    const doctor = new Doctorsreal({
      name,
      specialization,
      location,
      image,
      rating,
    });
    const savedDoctor = await doctor.save();
    res.status(201).json(savedDoctor);
  } catch (error) {
    res.status(500).json({
      message: "Error creating doctor",
      error: error.message,
    });
  }
});

// Get doctors
router.get("/doctors", auth, async (req, res) => {
  try {
    const doctors = await Doctorsreal.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching doctors",
      error: error.message,
    });
  }
});

// Book new appointment
router.post("/booking", auth, async (req, res) => {
  try {
    console.log("Received appointment request:", req.body);
    console.log("User from token:", req.user);

    const { doctorId, date, time, reason, patient } = req.body;

    if (!doctorId || !date || !time || !reason) {
      return res.status(400).json({
        message: "Missing required fields",
        received: { doctorId, date, time, reason },
      });
    }

    if (!mongoose.Types.ObjectId.isValid(doctorId)) {
      return res.status(400).json({ message: "Invalid doctor ID format" });
    }

    const appointmentDate = new Date(date);
    if (isNaN(appointmentDate)) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(time)) {
      return res.status(400).json({ message: "Invalid time format" });
    }

    const doctorDetails = await Doctorsreal.findById(doctorId);
    if (!doctorDetails) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const newAppointment = new Appointment({
      patient: {
        _id: new mongoose.Types.ObjectId(req.user.id),
        name: patient.name,
        email: patient.email,
      },
      doctor: {
        _id: new mongoose.Types.ObjectId(doctorId),
        name: doctorDetails.name,
        specialty: doctorDetails.specialization,
      },
      date: appointmentDate,
      time,
      reason,
      status: "Pending",
    });

    const savedAppointment = await newAppointment.save();

    const allAppointmentsEntry = new AllAppointments({
      appointmentId: savedAppointment._id,
      patient: savedAppointment.patient,
      doctor: savedAppointment.doctor,
      date: savedAppointment.date,
      time: savedAppointment.time,
      reason: savedAppointment.reason,
      status: savedAppointment.status,
    });

    await allAppointmentsEntry.save();

    const populatedAppointment = await savedAppointment.populate(
      "doctor",
      "name specialty location image rating"
    );

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment: populatedAppointment,
    });
  } catch (error) {
    console.error("Server error while booking appointment:", error);
    res.status(500).json({
      message: "Server error while booking appointment",
      error: error.message,
    });
  }
});  
 
// Get all appointments (admin only)
router.get("/allappointments", auth, async (req, res) => {
  try {
    const allAppointments = await AllAppointments.find()
      .populate("patient", "name email")
      .populate("doctor", "name specialty")
      .sort("-createdAt");

    res.json(allAppointments);
  } catch (error) {
    console.error("Error fetching all appointments:", error);
    res.status(500).json({
      message: "Error fetching all appointments",
      error: error.message,
    });
  }
});

// Update appointment status
router.patch("/appointments/:id/status", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid appointment ID format" });
    }

    const validStatuses = ["Pending", "Confirmed", "Completed", "Cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedAppointment = await AllAppointments.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json(updatedAppointment);
  } catch (error) {
    console.error("Error updating appointment status:", error);
    res.status(500).json({
      message: "Error updating appointment status",
      error: error.message,
    });
  }
});

// Send meeting link email
router.post("/send-meeting-link", auth, async (req, res) => {
  try {
    const {
      email,
      meetingLink,
      appointmentId,
      patientName,
      doctorName,
      appointmentTime,
      appointmentDate,
      customMessage,
    } = req.body;

    if (!email || !meetingLink || !appointmentId) {
      return res.status(400).json({
        message: "Missing required fields",
        received: { email, meetingLink, appointmentId },
      });
    }

    // Format the date
    const formattedDate = new Date(appointmentDate).toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );

    // Create email HTML content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c3e50;">Your Video Consultation Link</h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 10px 0;"><strong>Dear ${patientName},</strong></p>
          <p>Your video consultation has been set up with Dr. ${doctorName}.</p>
          
          ${
            customMessage
              ? `
          <div style="margin: 20px 0; padding: 15px; background-color: #e9ecef; border-left: 4px solid #007bff; border-radius: 4px;">
            <p style="margin: 0;"><strong>Message from your doctor:</strong></p>
            <p style="margin: 10px 0;">${customMessage}</p>
          </div>
          `
              : ""
          }
          
          <div style="margin: 20px 0;">
            <p><strong>Appointment Details:</strong></p>
            <p>Date: ${formattedDate}</p>
            <p>Time: ${appointmentTime}</p>
            <p>Appointment ID: ${appointmentId}</p>
          </div>

          <div style="margin: 20px 0;">
            <p><strong>How to Join:</strong></p>
            <p>1. Click the link below at your scheduled time</p>
            <p>2. Allow access to your camera and microphone when prompted</p>
            <p>3. Wait for your doctor to join the session</p>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${meetingLink}" 
               style="background-color: #007bff; 
                      color: white; 
                      padding: 12px 25px; 
                      text-decoration: none; 
                      border-radius: 5px; 
                      display: inline-block;">
              Join Video Consultation
            </a>
          </div>

          <p style="color: #6c757d; font-size: 14px;">
            Note: Please join the meeting 5 minutes before your scheduled time. 
            Make sure you have a stable internet connection and a quiet environment.
          </p>
        </div>

        <div style="color: #6c757d; font-size: 12px; margin-top: 20px;">
          <p>This is an automated message. Please do not reply to this email.</p>
        </div>
      </div>
    `;

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Video Consultation Link",
      html: emailHtml,
    });

    // Update appointment status to reflect that meeting link was sent
    await AllAppointments.findByIdAndUpdate(appointmentId, {
      $set: {
        meetingLinkSent: true,
        meetingLinkSentAt: new Date(),
        customMessage: customMessage || null, // Store the custom message if provided
      },
    });

    res.status(200).json({
      message: "Meeting link sent successfully",
    });
  } catch (error) {
    console.error("Error sending meeting link:", error);
    res.status(500).json({
      message: "Error sending meeting link",
      error: error.message,
    });
  }
});
// Middleware to handle errors
router.use((error, req, res, next) => {
  console.error("Router Error Handler:", error);
  res.status(500).json({
    message: "Internal server error",
    error: error.message,
  });
});

module.exports = router;
