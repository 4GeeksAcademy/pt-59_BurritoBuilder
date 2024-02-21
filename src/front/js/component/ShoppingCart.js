// ShoppingCart.js
import React from 'react';

const ShoppingCart = ({ cartItems, onRemoveFromCart }) => (
  <div id="cart">
    <h2>Shopping Cart</h2>
    <ul>
      {cartItems.map(item => (
        <li key={item.id}>
          {item.name} - ${item.price.toFixed(2)}
          <button onClick={() => onRemoveFromCart(item.id)}>Remove</button>
        </li>
      ))}
    </ul>
    <p>Total: ${cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)}</p>
  </div>
);

export default ShoppingCart;
