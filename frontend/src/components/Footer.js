import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <>
      <footer className="footer-section">
        <div className="footer-container">
          <div className="footer-item">
            <h3>Our Mission</h3>
            <p>We help traders achieve maximum results at a minimum cost of our hard work.</p>
          </div>

          <div className="footer-item">
            <h3>Contact</h3>
            <p>For support inquiries, please contact our team via live chat on our website. We are here to assist you.</p>
          </div>

          <div className="footer-item">
            <h3><a href="/policies">Policies</a></h3>
            <p><a href="/policies">Legal notice</a></p>
            <p><a href="/policies">Terms of Service</a></p>
            <p><a href="/policies">Privacy Policy</a></p>
          </div>
        </div>
      </footer>

      {/* Sub-footer section */}
      <footer className="footer copyright-footer">
        <p>© 2025 Weltnexus. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Footer;
