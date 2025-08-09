import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import dogImage from '../images/dog-home.jpg'; // Update path if necessary
import './HomePage.css';
import axios from 'axios';

function HomePage() {
  const [showPostForm, setShowPostForm] = useState(false);
  const [content, setContent] = useState('');
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content && !photo) {
      alert('Please enter some content or select a photo.');
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('content', content);
      if (photo) formData.append('photo', photo);

      // Debug: log token
      const token = localStorage.getItem('token');
      console.log('Token:', token);

      if (!token) {
        alert('You must be logged in to post a moment.');
        setLoading(false);
        return;
      }

      await axios.post('http://localhost:5000/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      setContent('');
      setPhoto(null);
      setShowPostForm(false);
      setLoading(false);
      navigate('/moments');
    } catch (error) {
      console.error('Failed to post moment', error);
      setLoading(false);
    }
  };

  return (
    <div className="homepage" style={{ background: "#fbeeed", minHeight: "100vh" }}>
      {/* Hero Section */}
      <main style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "left",
        gap: 350,
        marginTop: 40,
        padding: "0 24px"
      }}>
        {/* Left side */}
        <section>
          <h1 style={{ fontSize: "3rem", color: "#2d1d0f", marginBottom: 0 }}>
            Find Your <br /><span style={{ color: "#d26944" }}>Perfect Friend</span>
          </h1>
          <p style={{
            maxWidth: 450,
            margin: "20px 0",
            color: "#5b4331",
            fontSize: 18
          }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div style={{ display: "flex", gap: 18 }}>
            <button style={adoptBtnStyle}>Adopt Now</button>
            <button style={learnBtnStyle} onClick={() => setShowPostForm(true)}>Post Moments ‪‪❤︎‬</button>
          </div>

          {showPostForm && (
            <div className="modal-overlay" onClick={() => setShowPostForm(false)} style={modalOverlayStyle}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()} style={modalContentStyle}>
                <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
                  <textarea
                    placeholder="Share your pet moment..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={4}
                    style={{ width: '100%', padding: 10, borderRadius: 8, borderColor: '#d26944' }}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    style={{ marginTop: 10 }}
                  />
                  <div style={{ marginTop: 10 }}>
                    <button type="submit" disabled={loading} style={submitBtnStyle}>
                      {loading ? 'Posting...' : 'Post'}
                    </button>
                    <button type="button" onClick={() => setShowPostForm(false)} style={cancelBtnStyle}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </section>

        {/* Right side */}
        <section>
          <div style={{
            background: "linear-gradient(150deg,#ffd5c7 30%,#fadad3 70%)",
            borderRadius: "0 0 50% 50% / 0 0 30% 30%",
            boxShadow: "0 4px 30px #fadad3",
            width: 380, height: 310, display: "flex",
            alignItems: "center", justifyContent: "center"
          }}>
            <img
              src={dogImage}
              alt="dog"
              style={{
                width: 300, height: 230, objectFit: "cover",
                borderRadius: "0 0 120px 120px / 0 0 70px 70px"
              }}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalContentStyle = {
  backgroundColor: '#fff',
  padding: 20,
  borderRadius: 10,
  boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
  width: '90%',
  maxWidth: 400,
};

// --- Button & Link Styles ---
const adoptBtnStyle = {
  background: "#3a1d0c", color: "#fff", border: "none",
  padding: "14px 34px", borderRadius: 28, fontSize: 18, fontWeight: 700, cursor: "pointer"
};
const learnBtnStyle = {
  background: "none", color: "#3a1d0c", border: "2px solid #d26944",
  padding: "14px 34px", borderRadius: 28, fontSize: 18, fontWeight: 700, cursor: "pointer"
};
const submitBtnStyle = {
  background: "#d26944", color: "#fff", border: "none",
  padding: "10px 20px", borderRadius: 20, fontSize: 16, fontWeight: 600, cursor: "pointer",
  marginRight: 10
};
const cancelBtnStyle = {
  background: "#aaa", color: "#fff", border: "none",
  padding: "10px 20px", borderRadius: 20, fontSize: 16, fontWeight: 600, cursor: "pointer"
};

export default HomePage;
