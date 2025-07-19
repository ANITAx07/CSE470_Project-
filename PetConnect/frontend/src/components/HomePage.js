import React from 'react';
import { Link } from 'react-router-dom';

import dogImage from '../images/dog-home.jpg'; // Update path if necessary
import './HomePage.css';

function App() {
  return (
    <div className="homepage" style={{ background: "#fbeeed", minHeight: "100vh" }}>
      {/* Hero Section */}
      <main style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "left", // <-- Center content
        gap: 350,                  // <-- Add space between text & image
        marginTop: 40,
        padding: "0 24px"         // <-- Reduce side padding
      }}>
  {/* ...left and right sections as before... */}


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
            <button style={learnBtnStyle}>Post Moments ‪‪❤︎‬</button>
          </div>
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

// --- Button & Link Styles ---
const adoptBtnStyle = {
  background: "#3a1d0c", color: "#fff", border: "none",
  padding: "14px 34px", borderRadius: 28, fontSize: 18, fontWeight: 700, cursor: "pointer"
};
const learnBtnStyle = {
  background: "none", color: "#3a1d0c", border: "2px solid #d26944",
  padding: "14px 34px", borderRadius: 28, fontSize: 18, fontWeight: 700, cursor: "pointer"
};

export default App;
