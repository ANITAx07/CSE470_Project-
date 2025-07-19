import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', {
        name,
        email,
        password
      });

      alert(res.data.message || 'Signup successful!');

      // ✅ Store user ID in localStorage
      localStorage.setItem('userId', res.data.user._id);

      // ✅ Redirect to profile page
      window.location.href = '/profile';

    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="signup-page">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <label>Name</label>
        <input
          type="text"
          value={name}
          required
          onChange={e => setName(e.target.value)}
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          required
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit">Create Account</button>
        <div className="signup-link">
          Already have an account? <a href="/login">Login</a>
        </div>
      </form>
    </div>
  );
}
