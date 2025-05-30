import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/checkout.css';

function CheckoutPage({ cartItems, onClearCart }) {
  const [message, setMessage] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const orderDetails = {
      name: form.get('name'),
      address: form.get('address'),
      email: form.get('email'),
      items: cartItems,
    };

    try {
      await axios.post('http://127.0.0.1:8000/checkout', orderDetails);
      setOrderPlaced(true);
      setMessage('🎉 Order placed successfully!');
      setTimeout(() => {
        onClearCart();
        navigate('/', { state: { message: '✅ Thank you! Your order was placed.' } });
      }, 3000);
    } catch (error) {
      console.error('Checkout failed', error);
      setMessage('❌ Error placing order.');
    }
  };

  if (orderPlaced) {
    return (
      <div className="checkout-confirm">
        <h2>✅ Thank you for your order!</h2>
        <p>We’re processing it and will redirect you shortly...</p>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout 🧾</h2>
      {message && <p className="checkout-message">{message}</p>}

      <form className="checkout-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" required />
        <input type="text" name="address" placeholder="Shipping Address" required />
        <input type="email" name="email" placeholder="Email" required />
        <button className="submit-button" type="submit">Place Order 🚀</button>
      </form>
    </div>
  );
}

export default CheckoutPage;
