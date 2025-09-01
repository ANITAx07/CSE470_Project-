// Contact.js
import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>📞 Contact PetConnect</h1>
        <p>We’d love to hear from you! Whether it's help with adoption, donations, or general inquiries.</p>
      </div>

      <div className="contact-section">
        <h2>📋 General Contact Information</h2>
        <p>Email: support@petconnect.org</p>
        <p>Phone: +880-1234-567890</p>
        <p>Address: 123 PetConnect Lane, Dhaka, Bangladesh</p>
      </div>

      <div className="contact-section">
        <h2>❤️ Adoption & Donation Support</h2>
        <p>For help with pet adoptions or donations:</p>
        <p>Email: adoption@petconnect.org</p>
        <p>Email: donation@petconnect.org</p>
      </div>

      <div className="contact-section">
        <h2>🕘 Operating Hours</h2>
        <p>Sunday to Thursday: 9:00 AM – 6:00 PM</p>
        <p>Friday & Saturday: Closed</p>
      </div>

      <div className="contact-section">
        <h2>🔗 Follow Us on Social Media</h2>
        <p><a href="https://facebook.com/petconnect" target="_blank" rel="noopener noreferrer">Facebook</a></p>
        <p><a href="https://instagram.com/petconnect" target="_blank" rel="noopener noreferrer">Instagram</a></p>
        <p><a href="https://twitter.com/petconnect" target="_blank" rel="noopener noreferrer">Twitter</a></p>
      </div>

      <div className="contact-section emergency">
        <h2>🚨 Emergency Contact</h2>
        <p>Hotline (24/7): +880-9876-543210</p>
      </div>
    </div>
  );
};

export default Contact;
