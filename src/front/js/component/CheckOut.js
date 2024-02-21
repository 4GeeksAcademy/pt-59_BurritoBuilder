// Checkout.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext'; // Assuming you have a CartContext

const Checkout = () => {
  const { cart, removeFromCart } = useCart();

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div>
      <h2>Checkout</h2>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price.toFixed(2)}
            <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total: ${calculateTotal()}</p>
      <Link to="/stripe-container">
        <button className="btn btn-primary">Proceed to Payment</button>
      </Link>
    </div>
  );
};

export default Checkout;
