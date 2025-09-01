import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import './Navbar.css';

export default function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="main-navbar">
      {/* Logo */}
      <div className="navbar-logo" onClick={() => navigate('/dashboard')}>
        <img src={logo} alt="PetConnect" />
        <span>Admin Panel</span>
      </div>

      {/* Admin Links */}
      <div className="navbar-links">
        <button onClick={handleLogout} className="account-btn">Logout</button>
      </div>
    </nav>
  );
}
