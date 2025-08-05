import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import "./Navbar.css";
import axios from "axios";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setUserRole(storedRole);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchNotificationCount();
    }
  }, [isLoggedIn]);

  const fetchNotificationCount = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const res = await axios.get(`http://localhost:5000/api/notifications/${userId}`);
      const unreadCount = res.data.filter(n => !n.read).length;
      setNotificationCount(unreadCount);
    } catch (err) {
      console.error("Failed to fetch notification count", err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserRole('');
    navigate("/login");
  };

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="main-navbar">
      {/* Logo */}
      <div className="navbar-logo" onClick={() => navigate("/")}>
        <img src={logo} alt="PetConnect" />
        <span>PetConnect</span>
      </div>

      {/* Navigation Links */}
      <div className="navbar-links">
        <Link to="/" className="navlink">Home</Link>
        <Link to="/adopt" className="navlink">Adopt a Pet</Link>
        <Link to="/donate" className="navlink">Donate</Link>
        <Link to="/contact" className="navlink">Contact</Link>
        {/* <Link to="/my-requests">My Requests</Link> */}

      </div>

      {/* Account Dropdown */}
      <div className="navbar-account" ref={menuRef} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <button className="account-btn" onClick={() => setMenuOpen(!menuOpen)}>
          Account
        </button>

        {/* Notification Bell Icon with Badge */}
        {isLoggedIn && (
          <div
            className="notification-bell"
            style={{ position: 'relative', marginLeft: '15px', cursor: 'pointer' }}
            onClick={() => navigate('/notifications')}
            title="Notifications"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-bell"
              viewBox="0 0 16 16"
            >
              <path d="M8 16a2 2 0 0 0 1.985-1.75H6.015A2 2 0 0 0 8 16zm.104-14.995a1 1 0 0 0-2.208 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 2.042-1.042 2.732-.3.38-.458.68-.458.768v.5a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5v-.5c0-.088-.158-.388-.458-.768C13.5 8.042 13 7.098 13 6a5.002 5.002 0 0 0-4.896-4.995zM8 1a4 4 0 0 1 4 4c0 1.098.5 2.042 1.042 2.732.3.38.458.68.458.768v.5H2v-.5c0-.088.158-.388.458-.768C3.5 7.042 4 6.098 4 5a4 4 0 0 1 4-4z"/>
            </svg>
            {notificationCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  backgroundColor: 'red',
                  color: 'white',
                  borderRadius: '50%',
                  padding: '2px 6px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                {notificationCount}
              </span>
            )}
          </div>
        )}

        {menuOpen && (
          <div className="account-dropdown">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="dropdown-link" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/signup" className="dropdown-link" onClick={() => setMenuOpen(false)}>Sign Up</Link>
              </>
            ) : userRole === 'admin' ? (
              <>

                <Link to="/dashboard" className="dropdown-link" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                {/* <Link to="/manage-users" className="dropdown-link" onClick={() => setMenuOpen(false)}>Manage Users</Link> */}
                {/* <Link to="/manage-pets" className="dropdown-link" onClick={() => setMenuOpen(false)}>Manage Pets</Link> */}
                <button className="dropdown-link logout" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/profile" className="dropdown-link" onClick={() => setMenuOpen(false)}>My Profile</Link>
                <Link to="/my-adoptions" className="dropdown-link" onClick={() => setMenuOpen(false)}>My Adoptions</Link>
                <Link to="/my-donations" className="dropdown-link" onClick={() => setMenuOpen(false)}>My Donations</Link>
                <Link to="/favorites" className="dropdown-link" onClick={() => setMenuOpen(false)}>Favorites</Link>
                <button className="dropdown-link" onClick={handleLogout}>Logout</button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
