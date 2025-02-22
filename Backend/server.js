const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const doctorPersonRoutes = require("./routes/doctorAppointmentroute");
const Doctorsreal = require("./dbSchema/doctorSchema");
const checkmedicine = require("./routes/checkmedicine");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// CORS configuration with dynamic origins from .env
const corsOptions = {
  origin: [
    process.env.FRONTEND_URL || "http://localhost:5181",
    "http://localhost:3000" // Optional secondary URL
  ],
  credentials: true, // Enable if you need to send cookies
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// MongoDB connection with improved error handling
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected successfully");
    await initializeDoctors();
    console.log("Default doctors initialized");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process if DB connection fails
  }
};

// Initialize default doctors with error handling
const initializeDoctors = async () => {
  const defaultDoctors = [
    {
      _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439011"),
      name: "Dr. Sarah Jha - Cardiologist",
      specialization: "Cardiologist",
      location: "Sector 62",
      image: "https://t4.ftcdn.net/jpg/06/47/16/29/360_F_647162966_SFu8GP6awkeW0OnFnAxPjiGXSoeme4ht.jpg",
      rating: 4.8,
    },
    {
      _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439012"),
      name: "Dr. Sachin Maurya - Neurologist",
      specialization: "Neurologist",
      location: "Health Complex, Boston",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200",
      rating: 4.9,
    },
    {
      _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439013"),
      name: "Dr. Priya Verma - Pediatrician",
      specialization: "Pediatrician",
      location: "Children's Hospital, Chicago",
      image: "https://media.istockphoto.com/id/1293373291/photo/portrait-of-confident-ethnic-female-doctor.jpg?s=612x612&w=0&k=20&c=CJsw6IgTecJZoBeVXqZdvh2BI-NyVa-8VcQM3fPhbYc=",
      rating: 4.7,
    },
  ];

  try {
    for (const doctor of defaultDoctors) {
      const existingDoctor = await Doctorsreal.findById(doctor._id);
      if (!existingDoctor) {
        await Doctorsreal.create(doctor);
        console.log(`Created doctor: ${doctor.name}`);
      }
    }
  } catch (error) {
    console.error("Error initializing doctors:", error);
  }
};

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/doctorroutes", doctorPersonRoutes);
app.use("/api/uploadpicture", checkmedicine); // Fixed typo in route name

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

// Start server
const PORT = process.env.PORT || 5000;
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();