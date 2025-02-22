const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const doctorPersonRoutes = require("./routes/doctorAppointmentroute");
const Doctorsreal = require("./dbSchema/doctorSchema");

const checkmedicine = require("./routes/checkmedicine");

const initializeDoctors = async () => {
  const defaultDoctors = [
    {
      _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439011"),
      name: "Dr. Sarah Jha - Cardiologist",
      specialization: "Cardiologist",
      location: "Sector 62",
      image:
        "https://t4.ftcdn.net/jpg/06/47/16/29/360_F_647162966_SFu8GP6awkeW0OnFnAxPjiGXSoeme4ht.jpg",
      rating: 4.8,
    },
    {
      _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439012"),
      name: "Dr. Sachin Maurya - Neurologist",
      specialization: "Neurologist",
      location: "Health Complex, Boston",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200",
      rating: 4.9,
    },
    {
      _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439013"),
      name: "Dr. Priya Verma - Pediatrician",
      specialization: "Pediatrician",
      location: "Children's Hospital, Chicago",
      image:
        "https://media.istockphoto.com/id/1293373291/photo/portrait-of-confident-ethnic-female-doctor.jpg?s=612x612&w=0&k=20&c=CJsw6IgTecJZoBeVXqZdvh2BI-NyVa-8VcQM3fPhbYc=",
      rating: 4.7,
    },
  ];

  for (const doctor of defaultDoctors) {
    const existingDoctor = await Doctorsreal.findById(doctor._id);

    if (!existingDoctor) {
      await Doctorsreal.create(doctor);
    }
  }
};

dotenv.config();
const app = express();

app.use(
  cors({ 
    origin: ["http://localhost:5181", "http://localhost:3000"],
  })
);
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("MongoDB connected");
    await initializeDoctors();
    console.log("Doctors initialized");
  })
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/doctorroutes", doctorPersonRoutes);
app.use("/api/uploadpictur", checkmedicine);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: err.message,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
