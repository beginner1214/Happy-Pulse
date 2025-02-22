import React, { useState, useEffect } from "react";
import { Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Assuming this exists

const PatientPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login", { replace: true });
        return;
      }
  
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/appointments/booking`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      if (response.status === 401) {
        logout();
        navigate("/login", { replace: true });
        return;
      }
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Response error:", errorData); // Added logging
        throw new Error(errorData.message || "Failed to fetch appointments");
      }
      
      const data = await response.json();
      console.log("Appointments data:", data); // Added logging
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }
    fetchAppointments();
  }, [user, navigate]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Error state with retry option
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
          <button
            onClick={fetchAppointments}
            className="bg-[#09B480] text-white px-4 py-2 rounded hover:bg-opacity-90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            My Appointments
          </h1>
          <button
            onClick={() => navigate("/appointments")}
            className="bg-[#09B480] text-white px-4 py-2 rounded hover:bg-opacity-90"
          >
            Book New Appointment
          </button>
        </div>

        {appointments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <p className="text-gray-500 mb-4">No appointments found.</p>
            <button
              onClick={() => navigate("/appointments")}
              className="text-[#09B480] hover:underline"
            >
              Book your first appointment
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-1">
                    <div className="flex justify-between">
                      
                      <div className="flex flex-col items-end">
                        
                        <span
                          className={`mt-2 px-3 py-1 rounded-full text-sm ${
                            appointment.status === "Confirmed"
                              ? "bg-green-100 text-green-800"
                              : appointment.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : appointment.status === "Completed"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {appointment.status}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                        <span>
                          {new Date(appointment.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-gray-400 mr-2" />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="flex items-center">
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-medium text-gray-700">
                        Reason for Visit:
                      </h4>
                      <p className="text-gray-600 mt-1">{appointment.reason}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientPage;