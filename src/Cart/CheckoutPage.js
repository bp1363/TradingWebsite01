import React, { useState } from 'react';
import './CheckoutPage.css';
import { useCart } from '../context/CartContext';

const countryList = [
  "India", "USA", "UK", "Germany", "Australia", "Canada", "France", "Japan", "Brazil", "Italy"
];

const CheckoutPage = () => {
  const { cartItems, incrementItem, decrementItem, removeItem } = useCart();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    country: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});

  const calculateSubtotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  const validateForm = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.address.trim()) errs.address = 'Address is required';
    if (!formData.country.trim()) errs.country = 'Country is required';
    if (!formData.phone.trim()) errs.phone = 'Phone is required';
    return errs;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckout = () => setShowForm(true);

  const loadRazorpay = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const res = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    const orderResponse = await fetch("http://localhost:5000/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: calculateSubtotal() * 100 }),
    });

    const orderData = await orderResponse.json();
    if (!orderData.id) {
      alert("Failed to create order. Please check your backend.");
      return;
    }

    await fetch("http://localhost:5000/save-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        address: formData.address,
        country: formData.country,
        phone: formData.phone,
        paymentId: "PENDING",
      }),
    });

    const options = {
      key: "rzp_test_hXS0hoXQpJ1Q4j",
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Weltnexus",
      description: "Order Payment",
      order_id: orderData.id,
      handler: function (response) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);

        fetch("http://localhost:5000/save-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            address: formData.address,
            country: formData.country,
            phone: formData.phone,
            paymentId: response.razorpay_payment_id,
          }),
        });
      },
      prefill: {
        name: formData.name,
        contact: formData.phone,
      },
      theme: {
        color: "#00ff88",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="main-wrapper">
      <div className="cart-container">
        <h1 className="cart-title">Your cart</h1>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-header">
              <span className="cart-col product-col">PRODUCT</span>
              <span className="cart-col quantity-col">QUANTITY</span>
              <span className="cart-col total-col">TOTAL</span>
            </div>

            {cartItems.map(item => (
              <div className="cart-item" key={item.id}>
                <div className="product-col product-info">
                  <img src={item.image} alt={item.title} className="product-img" />
                  <div className="product-details">
                    <h3>{item.title}</h3>
                    <div className="stars">⭐️⭐️⭐️⭐️⭐️ <span className="reviews">(1205)</span></div>
                    <p className="unit-price">${item.price}</p>
                    <p className="preset-label">Preset: Essential</p>
                  </div>
                </div>

                <div className="quantity-col quantity-control">
                  <button onClick={() => decrementItem(item.id)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => incrementItem(item.id)}>+</button>
                </div>

                <div className="total-col total-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                <div className="remove-btn" title="Remove item" onClick={() => removeItem(item.id)}>🗑</div>
              </div>
            ))}

            <div className="cart-subtotal">
              <span>Subtotal</span>
              <span>${calculateSubtotal()}</span>
            </div>

            {!showForm ? (
              <div className="cart-buttons">
                <button className="checkout-btn" onClick={handleCheckout}>Proceed to pay</button>
              </div>
            ) : (
              <div className="checkout-form-wrapper">
                <h3 className="form-heading">Enter Your Details</h3>
                <div className="checkout-form">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  {errors.name && <span className="form-error">{errors.name}</span>}

                  <textarea
                    name="address"
                    placeholder="Shipping Address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                  {errors.address && <span className="form-error">{errors.address}</span>}

                  <div className="row-fields">
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Country</option>
                      {countryList.map((country, index) => (
                        <option key={index} value={country}>{country}</option>
                      ))}
                    </select>

                    <input
                      type="tel"
                      name="phone"
                      placeholder="Mobile Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  {errors.country && <span className="form-error">{errors.country}</span>}
                  {errors.phone && <span className="form-error">{errors.phone}</span>}

                  <button className="pay-btn" onClick={handlePayment}>Pay Now</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <footer className="footer">
        <p>© 2025 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CheckoutPage;
