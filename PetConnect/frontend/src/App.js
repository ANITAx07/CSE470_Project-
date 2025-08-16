// PetConnect/frontend/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import Profile from "./components/Profile";
import AdminAddPet from "./components/AdminAddPet";
import AdminDashboard from "./components/AdminDashboard";
import AdminManagePets from './components/AdminManagePets';
import AdoptPage from "./components/AdoptPage";
import AdoptionForm from "./components/AdoptionForm";
import AdminAdoptionRequests from './components/AdminAdoptionRequests';
import MyAdoptions from './components/MyAdoptions';
import FavoritePage from './components/FavoritePage'; 
import NotificationsPage from './components/NotificationsPage';
import MomentsFeed from './components/MomentsFeed';
import MyPosts from './components/MyPosts';
import PostPage from './components/PostPage';
import DonateItem from './components/DonateItem';
import MyDonations from './components/MyDonations';

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
      <Route path="/forgot-password" element={<ForgotPassword />} />
      {/* Remove reset-password route */}
      {/* <Route path="/reset-password/:token" element={<ResetPassword />} /> */}
      <Route path="/notifications" element={<NotificationsPage />} />  {/* Added route */}
      <Route path="/moments" element={<MomentsFeed />} />  {/* Added moments route */}
      <Route path="/post/:postId" element={<PostPage />} /> {/* Added post detail route */}

      {/* Protected Routes */}
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/admin/add-pet" element={<ProtectedRoute><AdminAddPet /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/dashboard/manage-pets" element={<ProtectedRoute><AdminManagePets /></ProtectedRoute>} />
      <Route path="/adopt/:petId/form" element={<ProtectedRoute><AdoptionForm /></ProtectedRoute>} />
      <Route path="/my-adoptions" element={<MyAdoptions />} />
      <Route path="/my-posts" element={<ProtectedRoute><MyPosts /></ProtectedRoute>} />
      <Route path="/my-donations" element={<ProtectedRoute><MyDonations /></ProtectedRoute>} />
      <Route path="/donate" element={<ProtectedRoute><DonateItem /></ProtectedRoute>} />
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
