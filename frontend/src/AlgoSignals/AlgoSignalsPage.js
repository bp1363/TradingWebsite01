import React from 'react';
import './AlgoSignalsPage.css';
import Footer from '../components/Footer'; // adjust path if needed
import signalImage from '../assets/signal-image.jpg';
import CustomCarousel from '../components/CustomCarousel';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const AlgoSignalsPage = () => {
  const price = 89;
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const product = {
      id: 1,
      name: 'Algo Signals V1 [Lifetime Access]',
      price,
      quantity: 1,
      image: signalImage,
    };
    addToCart(product);
    navigate('/cart');
  };

  return (
    <div>
      <div className="split-section">
        <div className="split-image">
          <img src={signalImage} alt="Split Visual" />
        </div>
        <div className="split-text">
          <h1>Algo Signals V1 [Lifetime Access]</h1>
          <div className="stars">⭐️⭐️⭐️⭐️⭐️ <span className="reviews">(5.6k)</span></div>
          <h2 style={{ marginBottom: '10px', color: '#2e8b57' }}>
          $  {price}.00
          </h2>
          <button className="split-button" onClick={handleAddToCart}>
          Buy it now
          </button>
          
        </div>
      </div>

      <div className="headline-section">
        <h1>Why Choose Algo Signals?</h1>
      </div>

      <CustomCarousel />

      <div className="below-carousel-section">
        <h1>Start with Algo Signals V1 Today</h1>
        <p>
          Click the button below to get lifetime access to GainzAlgo V2 while it's still on sale!
        </p>
        <button className="learn-more-button" onClick={handleAddToCart}>
        Buy it now
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default AlgoSignalsPage;
