// frontend/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ new import
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import AdminAddPet from "./components/AdminAddPet";
import AdminDashboard from "./components/AdminDashboard";
import AdminManagePets from './components/AdminManagePets';
import AdoptPage from "./components/AdoptPage";
import AdoptionForm from "./components/AdoptionForm";
import AdminAdoptionRequests from './components/AdminAdoptionRequests';
import MyAdoptions from './components/MyAdoptions';
import FavoritePage from './components/FavoritePage'; 

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/dashboard");

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/adopt" element={<AdoptPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/admin/add-pet" element={<ProtectedRoute><AdminAddPet /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/dashboard/manage-pets" element={<ProtectedRoute><AdminManagePets /></ProtectedRoute>} />
      <Route path="/adopt/:petId/form" element={<ProtectedRoute><AdoptionForm /></ProtectedRoute>} />
      <Route path="/my-adoptions" element={<MyAdoptions />} />
      <Route path="/dashboard/requests" element={<AdminAdoptionRequests />} />
      <Route path="/admin/adoption-requests" element={<ProtectedRoute><AdminAdoptionRequests /></ProtectedRoute>} />
      <Route path="/favorites" element={<ProtectedRoute><FavoritePage /></ProtectedRoute>} />
      
      {/* Catch-all route */}

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




















// import React from "react";
// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import HomePage from "./components/HomePage";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import Profile from "./components/Profile";
// import AdminAddPet from "./components/AdminAddPet";
// import AdminDashboard from "./components/AdminDashboard";
// import AdminManagePets from './components/AdminManagePets';
// import AdoptPage from "./components/AdoptPage";
// import AdoptionForm from "./components/AdoptionForm";



// function AppContent() {
//   const location = useLocation();
//   const isAdminRoute = location.pathname.startsWith("/dashboard");

//   return (
//     <>
//       {!isAdminRoute && <Navbar />}

//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         {/* <Route path="/adopt" element={<div style={{ padding: 48 }}>Adopt a Pet Page (coming soon)</div>} /> */}
//         <Route path="/adopt" element={<AdoptPage />} />
//         <Route path="/donate" element={<div style={{ padding: 48 }}>Donate Page (coming soon)</div>} />
//         <Route path="/contact" element={<div style={{ padding: 48 }}>Contact Page (coming soon)</div>} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/admin/add-pet" element={<AdminAddPet />} />
//         <Route path="/dashboard" element={<AdminDashboard />} />
//         <Route path="/dashboard/manage-pets" element={<AdminManagePets />} />
//         <Route path="/adopt/:petId/form" element={<AdoptionForm />} />

//         {/* <Route path="/adopt" element={<AdoptPage />} /> */}

//       </Routes>
//     </>
//   );
// }

// export default function App() {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// }
