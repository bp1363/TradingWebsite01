import React, { useState } from 'react';
import './CheckoutPage.css';

const CartPage = () => {
    const [quantity, setQuantity] = useState(1);
    const unitPrice = 99.95;
    const subtotal = (unitPrice * quantity).toFixed(2);

    const increment = () => setQuantity(prev => prev + 1);
    const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    const handleCheckout = async () => {
        const res = await fetch("/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: subtotal }),
        });

        const orderData = await res.json();

        const options = {
            key: "rzp_test_hXS0hoXQpJ1Q4j", // replace with yours
            amount: orderData.amount,
            currency: orderData.currency,
            name: "AlgoSignal",
            description: "Lifetime Access",
            image: "/images/logo.png",
            order_id: orderData.id,
            handler: function (response) {
                alert(`Payment Successful! ID: ${response.razorpay_payment_id}`);
            },
            prefill: {
                name: "John Doe",
                email: "john@example.com",
                contact: "9999999999"
            },
            theme: {
                color: "#00ff88"
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <div className="cart-container">
            <h1 className="cart-title">Your cart</h1>

            <div className="cart-header">
                <span className="cart-col product-col">PRODUCT</span>
                <span className="cart-col quantity-col">QUANTITY</span>
                <span className="cart-col total-col">TOTAL</span>
            </div>

            <div className="cart-item">
                <div className="product-col product-info">
                    <img src="/images/preset-guide.png" alt="Preset Guide" className="product-img" />
                    <div className="product-details">
                        <h3>GainzAlgo V2 [Lifetime Access]</h3>
                        <div className="stars">⭐️⭐️⭐️⭐️⭐️ <span className="reviews">(1205)</span></div>
                        <p className="unit-price">$99.95</p>
                        <p className="preset-label">Preset: Essential</p>
                    </div>
                </div>

                <div className="quantity-col quantity-control">
                    <button onClick={decrement}>−</button>
                    <span>{quantity}</span>
                    <button onClick={increment}>+</button>
                </div>

                <div className="total-col total-price">${subtotal}</div>
                <div className="remove-btn">🗑</div>
            </div>

            <div className="cart-subtotal">
                <span>Subtotal</span>
                <span>${subtotal}</span>
            </div>

            <div className="cart-buttons">
                <button className="continue-btn">Continue shopping</button>
                <button className="checkout-btn" onClick={handleCheckout}>Proceed to Pay</button>
            </div>
        </div>
    );
};

export default CartPage;
