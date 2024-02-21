// Product.js
import React from 'react';

const Product = ({ id, name, price, onAddToCart }) => (
  <div className="product">
    <p>{name} - ${price.toFixed(2)}</p>
    <button onClick={() => onAddToCart(id)}>Add to Cart</button>
  </div>
);

export default Product;
