// src/pages/PoliciesPage.js
import React from 'react';
import './PoliciesPage.css';

const PoliciesPage = () => {
  return (
    <div className="policies-page">
      <h1>Our Policies</h1>

      <section className="policy-section">
        <h2>Legal Notice</h2>
        <p>
          This website and its contents are owned and operated by Weltnexus. All rights reserved.
        </p>
      </section>

      <section className="policy-section">
        <h2>Terms of Service</h2>
        <p>
          By using our website, you agree to our terms and conditions, including but not limited to
          user responsibilities, data handling, and compliance with laws.
        </p>
      </section>

      <section className="policy-section">
        <h2>Privacy Policy</h2>
        <p>
          We respect your privacy and are committed to protecting your personal data. Please review
          our policies on data collection, cookies, and third-party services.
        </p>
      </section>
    </div>
  );
};

export default PoliciesPage;
