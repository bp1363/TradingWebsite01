import React from 'react';
import '../components/Home.css';
import CustomCarousel from '../components/CustomCarousel';
import Footer from '../components/Footer'; // adjust path if needed
//import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <header className="header">
        <h1>Welcome to Weltnexus</h1>
        <h2>Algo Signals - The Best Trading Algo</h2>
        <a href="https://youtube.com/@algosignalstrader?si=HMuSXDS5QyNZRhZL" target="_blank" rel="noopener noreferrer">
  <button className="main-btn">Get Algo Signals V1</button>
</a>

      </header>

      <section className="tagline-section">
        <h1 className="tagline-text">Why Algosignal Stands Out</h1>
      </section>

      <section className="cards-section">
        <div className="card">
          <h3>Simple & Effective📈</h3>
          <p>Trade using simple BUY & SELL signals, which never repaint or lag...</p>
        </div>
        <div className="card">
          <h3>Early & Accurate ⚡</h3>
          <p>Unlike fake indicators based on lagging MAs...</p>
        </div>
        <div className="card">
          <h3>All Markets & Timeframes 🌎</h3>
          <p>Algo Signals has been tested and proven in every market...</p>
        </div>
        <div className="card">
          <h3>Lifetime Access ✅</h3>
          <p>No recurring charges. One-time fee only...</p>
        </div>
      </section>

      {/* 👇 Carousel should be here */}
      <CustomCarousel />

      <section className="promo-section">
        <h2>Experience the Future of Trading</h2>
        <p>Join thousands of traders already transforming their success with Algo Signals. Simple, powerful, and proven.</p>
        <a href="https://youtube.com/@algosignalstrader?si=HMuSXDS5QyNZRhZL" target="_blank" rel="noopener noreferrer">
  <button className="main-btn">Learn Now</button>
</a>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
