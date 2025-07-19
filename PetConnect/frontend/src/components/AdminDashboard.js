// frontend/src/components/AdminDashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import AdminAddPet from './AdminAddPet';
// import ManagePets from './ManagePets'; // optional for later

import './AdminDashboard.css'; // Optional: Your custom style

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('add');
  const navigate = useNavigate();

  return (
    <div>
      {/* ✅ Admin-specific navbar */}
      <AdminNavbar />

      {/* Admin Dashboard Layout */}
      <div className="admin-dashboard">
        {/* Sidebar */}
        <aside className="sidebar">
          <h2>Admin Panel</h2>
          <button onClick={() => setActiveTab('add')}>➕ Add Pet</button>
          {/* <button onClick={() => setActiveTab('manage')}>📝 Manage Pets</button> */}
          <button onClick={() => navigate('/')}>🏠 Home</button>
        </aside>

        {/* Content Area */}
        <main className="dashboard-content">
          {activeTab === 'add' && <AdminAddPet />}
          {/* {activeTab === 'manage' && <ManagePets />} */}
        </main>
      </div>
    </div>
  );
}
