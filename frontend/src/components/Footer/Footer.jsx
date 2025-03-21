import React from 'react';
import './Footer.css'; // Import the CSS file

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        {/* Copyright and Credit Section */}
        <p className="footer-text">
          &copy; 2025 <strong>Cloud Memo</strong>. All Rights Reserved.
        </p>

        {/* Unique Statement - Made by Amit Kalsariya */}
        <p className="footer-statement">
          Made with ❤️ by <a href="https://www.linkedin.com/in/amit-kalsariya" target="_blank" rel="noopener noreferrer">Amit Kalsariya</a>
        </p>

        {/* Additional Section */}
        <p className="footer-description">
          Cloud Memo is a platform designed to help you keep your notes organized and easily accessible. Stay tuned for new features and updates!
        </p>
      </div>
    </div>
  );
}

export default Footer;
