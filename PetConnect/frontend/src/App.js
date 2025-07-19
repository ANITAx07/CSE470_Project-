import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import AdminAddPet from "./components/AdminAddPet";
import AdminDashboard from "./components/AdminDashboard";

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/dashboard");

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/adopt" element={<div style={{ padding: 48 }}>Adopt a Pet Page (coming soon)</div>} />
        <Route path="/donate" element={<div style={{ padding: 48 }}>Donate Page (coming soon)</div>} />
        <Route path="/contact" element={<div style={{ padding: 48 }}>Contact Page (coming soon)</div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/add-pet" element={<AdminAddPet />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
