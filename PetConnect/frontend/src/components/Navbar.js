import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setUserRole(storedRole);
      setIsLoggedIn(true);
    }
  }, []);

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
      </div>

      {/* Account Dropdown */}
      <div className="navbar-account" ref={menuRef}>
        <button className="account-btn" onClick={() => setMenuOpen(!menuOpen)}>
          Account
        </button>

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
                <Link to="/manage-users" className="dropdown-link" onClick={() => setMenuOpen(false)}>Manage Users</Link>
                <Link to="/manage-pets" className="dropdown-link" onClick={() => setMenuOpen(false)}>Manage Pets</Link>
                <button className="dropdown-link logout" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/profile" className="dropdown-link" onClick={() => setMenuOpen(false)}>My Profile</Link>
                <Link to="/my-adoptions" className="dropdown-link" onClick={() => setMenuOpen(false)}>My Adoptions</Link>
                <Link to="/my-donations" className="dropdown-link" onClick={() => setMenuOpen(false)}>My Donations</Link>
                <button className="dropdown-link" onClick={handleLogout}>Logout</button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
