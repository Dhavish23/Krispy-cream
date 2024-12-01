'use client';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import Next.js router
import './ShoppingCart.css'; // Import CSS file




export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Glazed Donuts',
      price: 122.21,
      quantity: 1,
      image: 'https://www.bootdey.com/image/200x200/',
    },
    {
      id: 2,
      name: 'Chocolate Donuts',
      price: 20.63,
      quantity: 2,
      image: 'https://www.bootdey.com/image/200x200/',
    },
  ]);

  const router = useRouter(); // Initialize router

  const incrementQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    const email = prompt('Enter your email address for order confirmation:');

    if (!email) {
      alert('Email is required to proceed with checkout.');
      return;
    }

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          cartItems,
          total: totalPrice,
        }),
      });

      if (response.ok) {
        alert('Order placed successfully! A confirmation email has been sent.');
        router.push('/checkout'); // Redirect to the checkout page
      } else {
        alert('Failed to send confirmation email. Please try again.');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>Shopping Cart</h2>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Sub Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    src={item.image}
                    alt={item.name}
                    width="50"
                    height="50"
                  />
                </td>
                <td>{item.name}</td>
                <td>
                  <div className="quantity-control">
                    <button
                      onClick={() => decrementQuantity(item.id)}
                      className="btn btn-default"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={item.quantity}
                      readOnly
                      className="input-qty"
                    />
                    <button
                      onClick={() => incrementQuantity(item.id)}
                      className="btn btn-default"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="3" style={{ textAlign: 'right' }}>
                Total
              </td>
              <td>${totalPrice.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button onClick={handleCheckout} className="btn btn-primary">
        Checkout <i className="fa fa-arrow-circle-right"></i>
      </button>
    </div>
  );
}
