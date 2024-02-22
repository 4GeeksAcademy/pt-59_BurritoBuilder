import React from 'react';
import { useCart } from '../../../Context/CartContext';

const Checkout = () => {
  const { cart } = useCart();

  return (
    <div>
      <h2>Checkout</h2>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price.toFixed(2)}
          </li>
        ))}
      </ul>
      {/* Add checkout logic and form here */}
    </div>
  );
};

export default Checkout;