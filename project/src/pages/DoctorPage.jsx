import React, { useState, useEffect } from "react";
import {
  User,
  Phone,
  Mail,
  Filter,
  Calendar,
  Clock,
  Video,
} from "lucide-react";
import {
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  CircularProgress,
  Box,
  Button,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const DoctorPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDoctor, setFilterDoctor] = useState("all");
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [meetingError, setMeetingError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const validateMeetingData = (appointmentId, appointment) => {
    if (!appointment) {
      throw new Error(`No appointment found with ID: ${appointmentId}`);
    }

    if (!appointment.patient?.email) {
      throw new Error(`No patient email found for appointment: ${appointmentId}`);
    }

    if (!appointment.patient?.name) {
      throw new Error(`No patient name found for appointment: ${appointmentId}`);
    }

    if (!appointment.doctor?.name) {
      throw new Error(`No doctor name found for appointment: ${appointmentId}`);
    }

    if (!appointment.time) {
      throw new Error(`No appointment time found for appointment: ${appointmentId}`);
    }

    if (!appointment.date) {
      throw new Error(`No appointment date found for appointment: ${appointmentId}`);
    }

    return true;
  };

  const handleStartMeeting = (appointmentId) => {
    try {
      const appointment = appointments.find(app => app._id === appointmentId);
      
      if (!appointment) {
        throw new Error(`No appointment found with ID: ${appointmentId}`);
      }

      // Validate meeting data
      validateMeetingData(appointmentId, appointment);

      // Create meeting data object with all necessary information
      const meetingData = {
        appointmentId,
        patientEmail: appointment.patient.email,
        patientName: appointment.patient.name,
        doctorName: appointment.doctor.name,
        timestamp: new Date().toISOString(),
        appointmentTime: appointment.time,
        appointmentDate: appointment.date,
        reason: appointment.reason
      };

      console.log("Meeting data being stored:", meetingData);

      // Store in localStorage
      try {
        localStorage.setItem('currentMeetingData', JSON.stringify(meetingData));
        console.log("Meeting data successfully stored in localStorage");
      } catch (storageError) {
        console.error("Failed to store meeting data in localStorage:", storageError);
        throw new Error("Failed to save meeting data. Please check your browser storage settings.");
      }

      // Verify data was stored correctly
      const storedData = localStorage.getItem('currentMeetingData');
      if (!storedData) {
        throw new Error("Meeting data was not properly stored");
      }

      const parsedData = JSON.parse(storedData);
      if (!parsedData.appointmentId || !parsedData.patientEmail) {
        throw new Error("Stored meeting data is incomplete");
      }

      console.log("Meeting data verification successful");
      setMeetingError(null);
      
      // Navigate to meeting page
      navigate(`/meetingplace/${appointmentId}`);

    } catch (error) {
      console.error("Error starting meeting:", error);
      setMeetingError(error.message);
      
      // Clean up any partially stored data
      try {
        localStorage.removeItem('currentMeetingData');
      } catch (cleanupError) {
        console.error("Failed to clean up meeting data:", cleanupError);
      }
    }
  };

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/appointments/allappointments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch appointments");
      const data = await response.json();
      setAppointments(data);
      setDoctors([...new Set(data.map((app) => app.doctor.name))]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (appointmentId, newStatus) => {
    try {
      setUpdateLoading(appointmentId);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/appointments/${appointmentId}/status`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) throw new Error("Failed to update appointment status");
      await fetchAppointments();
    } catch (error) {
      setError(error.message);
    } finally {
      setUpdateLoading(null);
    }
  };

  const AppointmentCard = ({ appointment }) => (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box sx={{ "& > *": { mb: 1 } }}>
            <Typography variant="h6">{appointment.patient.name}</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <User size={16} />
              <Typography variant="body2">
                Doctor: {appointment.doctor.name}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Mail size={16} />
              <Typography variant="body2">
                {appointment.patient.email}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Calendar size={16} />
              <Typography variant="body2">
                {new Date(appointment.date).toLocaleDateString()}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Clock size={16} />
              <Typography variant="body2">{appointment.time}</Typography>
            </Box>
            <Typography variant="body2">
              Reason: {appointment.reason}
            </Typography>
            <Typography variant="body2">
              Appointment ID: {appointment.appointmentId}
            </Typography>
            <Typography variant="body2">
              Created: {new Date(appointment.createdAt).toLocaleString()}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              startIcon={<Video />}
              onClick={() => handleStartMeeting(appointment._id)}
              sx={{ mt: 2 }}
            >
              Start Meeting
            </Button>
          </Box>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={appointment.status}
              label="Status"
              onChange={(e) => handleStatusUpdate(appointment._id, e.target.value)}
              disabled={updateLoading === appointment._id}
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Confirmed">Confirmed</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
            {updateLoading === appointment._id && (
              <CircularProgress size={20} sx={{ mt: 1 }} />
            )}
          </FormControl>
        </Box>
      </CardContent>
    </Card>
  );

  const filteredAppointments = appointments.filter(
    (app) =>
      (filterStatus === "all" || app.status === filterStatus) &&
      (filterDoctor === "all" || app.doctor.name === filterDoctor) &&
      (searchTerm === "" ||
        app.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.patient.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ maxWidth: "4xl", mx: "auto", p: 3 }}>
      <Typography variant="h4" gutterBottom>
        All Appointments
      </Typography>

      {meetingError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {meetingError}
        </Alert>
      )}

      <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 2 }}>
        <Filter size={20} />
        <TextField
          size="small"
          label="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={filterStatus}
            label="Status"
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Confirmed">Confirmed</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Doctor</InputLabel>
          <Select
            value={filterDoctor}
            label="Doctor"
            onChange={(e) => setFilterDoctor(e.target.value)}
          >
            <MenuItem value="all">All Doctors</MenuItem>
            {doctors.map((doctorName) => (
              <MenuItem key={doctorName} value={doctorName}>
                {doctorName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {filteredAppointments.length === 0 ? (
        <Typography
          variant="body1"
          align="center"
          sx={{ color: "text.secondary" }}
        >
          No appointments found
        </Typography>
      ) : (
        filteredAppointments.map((appointment) => (
          <AppointmentCard key={appointment._id} appointment={appointment} />
        ))
      )}
    </Box>
  );
};

export default DoctorPage;