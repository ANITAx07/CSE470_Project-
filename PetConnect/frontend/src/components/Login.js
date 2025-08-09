import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      const { message, user } = res.data;

      if (!user || !user.role) {
        alert('Login failed: No role found.');
        return;
      }

      // Save token
      const { token } = res.data;
      if (token) {
        localStorage.setItem('token', token);
      }

      // ✅ Save user info
      localStorage.setItem('userId', user.userId);
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('userName', user.name);
      if (user.avatar) {
        localStorage.setItem('userAvatar', `http://localhost:5000${user.avatar}`);
      }

      alert(`${message} (Role: ${user.role})`);

      // ✅ Redirect based on role
      if (user.role === 'admin') {
        window.location.href = '/dashboard';
      } else {
        window.location.href = '/profile';
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
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

        <div className="forgot-password-link" style={{ marginBottom: '10px' }}>
          <a href="/forgot-password">Forgot Password?</a>
        </div>

        <button type="submit">Login</button>
        <div className="login-link">
          Don&apos;t have an account? <a href="/signup">Sign up</a>
        </div>
      </form>
    </div>
  );
}
