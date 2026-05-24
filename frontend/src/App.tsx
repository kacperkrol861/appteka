import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DoctorDashboard from "./pages/DoctorDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

import PrescriptionForm from "./components/PrescriptionForm";
import PatientsList from "./doctor/PatientList";
import PrescriptionHistory from "./doctor/PrescriptionHistory";
import DoctorHome from "./doctor/DoctorHome";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ROOT */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PATIENT DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* DOCTOR PANEL (LAYOUT) */}
        <Route
          path="/doctor"
          element={
            <ProtectedRoute>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        {/* DOCTOR SUBPAGES */}
        <Route
          path="/doctor/create"
          element={
            <ProtectedRoute>
              <PrescriptionForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/patients"
          element={
            <ProtectedRoute>
              <PatientsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/history"
          element={
            <ProtectedRoute>
              <PrescriptionHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/home"
          element={
            <ProtectedRoute>
              <DoctorHome />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}