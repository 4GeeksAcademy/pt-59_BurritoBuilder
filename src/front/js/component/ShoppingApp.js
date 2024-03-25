// ShoppingApp.js
import React, { useState } from 'react';
import Product from './Product';
import ShoppingCart from './ShoppingCart';

const ShoppingApp = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (productId) => {
    // Assuming you have a list of products with id, name, and price
    const product = products.find(product => product.id === productId);
    if (product) {
      setCart([...cart, product]);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
  };

  // Sample list of products
  const products = [
    { id: 1, name: 'Product 1', price: 10.00 },
    { id: 2, name: 'Product 2', price: 15.00 },
    // Add more products as needed
  ];

  return (
    <div>
      <div id="products">
        <h2>Products</h2>
        {products.map(product => (
          <Product
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            onAddToCart={addToCart}
          />
        ))}
      </div>

      <ShoppingCart cartItems={cart} onRemoveFromCart={removeFromCart} />
    </div>
  );
};

export default ShoppingApp;