import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Prevention from "./pages/Prevention";
import Symptoms from "./pages/Symptoms";
import Treatment from "./pages/Treatment";
import Education from "./pages/Education";
import Appointments from "./pages/Appointments";
import ChatBot from "./components/ChatBot";
import Vaccineprograms from "./pages/prevention/vaccineprograms";
import SymptomsPredictor from "./pages/symptoms/SymptomPredictor";
import DoctorPage from "./pages/doctorpage";
import PatientPage from "./pages/patientpage";
import ProtectedRoute from "./components/ProtectedRoute";
import Meetingplace from "./pages/meetingplace";

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/prevention" element={<Prevention />} />
        <Route path="/symptoms" element={<Symptoms />} />
        <Route path="/treatment" element={<Treatment />} />
        <Route path="/education" element={<Education />} />
        <Route
          path="/appointments"
          element={
            <ProtectedRoute roles={["patient", "doctor"]}>
              <Appointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/meetingplace/:appointmentId"
          element={
            <ProtectedRoute roles={["patient", "doctor"]}>
              <Meetingplace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patientpage"
          element={
            <ProtectedRoute roles={["patient"]}>
              <PatientPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctorpage"
          element={
            <ProtectedRoute roles={["doctor"]}>
              <DoctorPage />
            </ProtectedRoute>
          }
        />
        <Route path="/vaccineprograms" element={<Vaccineprograms />} />
        <Route path="/SymptomsPredictor" element={<SymptomsPredictor />} />
      </Routes>
      <ChatBot />
    </div>
  );
}

export default App;